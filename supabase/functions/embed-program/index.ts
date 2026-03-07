import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildEmbeddingText(p: any): string {
  return `제도명: ${p.name}. 지역: ${p.region_city} ${p.region_district}. 카테고리: ${p.category}. 대상: ${p.target_gender || "무관"} ${p.target_household || "무관"}. 소득조건: ${p.target_income || "없음"}. 지원내용: ${p.support_detail}. 비용: ${p.cost}. 신청방법: ${p.how_to_apply}. 상태: ${p.status || "미확인"}.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { id, all } = body;

    // Fetch program(s)
    let programs: any[];
    if (all) {
      const { data, error } = await supabase.from("programs").select("*");
      if (error) throw error;
      programs = data;
    } else if (id) {
      const { data, error } = await supabase.from("programs").select("*").eq("id", id).single();
      if (error) throw error;
      programs = [data];
    } else {
      throw new Error("Provide either { id: '...' } or { all: true }");
    }

    let count = 0;

    for (const program of programs) {
      const content = buildEmbeddingText(program);

      // Call OpenAI embeddings
      const embResponse = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: content,
        }),
      });

      if (!embResponse.ok) {
        const errText = await embResponse.text();
        console.error(`OpenAI error for ${program.id}:`, errText);
        continue;
      }

      const embData = await embResponse.json();
      const embedding = embData.data[0].embedding;

      // Upsert into program_embeddings
      const { error: upsertError } = await supabase
        .from("program_embeddings")
        .upsert({
          id: program.id,
          content,
          embedding: JSON.stringify(embedding),
        });

      if (upsertError) {
        console.error(`Upsert error for ${program.id}:`, upsertError);
        continue;
      }

      count++;
    }

    return new Response(JSON.stringify({ success: true, count }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("embed-program error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
