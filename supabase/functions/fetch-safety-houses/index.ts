import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map address to region_city
function extractRegionCity(address: string): string {
  if (!address) return "기타";
  const regionMap: Record<string, string> = {
    서울: "서울특별시", 부산: "부산광역시", 대구: "대구광역시", 인천: "인천광역시",
    광주: "광주광역시", 대전: "대전광역시", 울산: "울산광역시", 세종: "세종특별자치시",
    경기: "경기도", 강원: "강원특별자치도", 충북: "충청북도", 충남: "충청남도",
    전북: "전북특별자치도", 전남: "전라남도", 경북: "경상북도", 경남: "경상남도",
    제주: "제주특별자치도",
  };
  for (const [short, full] of Object.entries(regionMap)) {
    if (address.includes(short) || address.includes(full)) return full;
  }
  return "기타";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("DATA_GO_KR_API_KEY");
    if (!apiKey) throw new Error("DATA_GO_KR_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch from public data API
    const url = new URL("http://api.data.go.kr/openapi/tn_pubr_public_female_safety_prtchouse_api");
    url.searchParams.set("serviceKey", apiKey);
    url.searchParams.set("type", "json");
    url.searchParams.set("numOfRows", "1000");
    url.searchParams.set("pageNo", "1");

    console.log("Fetching safety houses from API...");
    const response = await fetch(url.toString());

    if (!response.ok) {
      const text = await response.text();
      console.error("API error:", response.status, text);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    const items = data?.response?.body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      console.log("No items returned from API. Response:", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ success: true, count: 0, message: "No items from API" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Clear existing data
    await supabase.from("safety_houses").delete().neq("id", 0);

    // Transform and insert
    const rows = items.map((item: any) => {
      const address = item.rdnmadr || item.lnmadr || "";
      const startTime = item.operBeginTm || "";
      const endTime = item.operEndTm || "";
      const operatingHours = startTime && endTime ? `${startTime}~${endTime}` : "24시간";

      return {
        name: item.mngInstNm || item.instNm || "여성안심지킴이집",
        address,
        latitude: item.latitude ? parseFloat(item.latitude) : null,
        longitude: item.longitude ? parseFloat(item.longitude) : null,
        operating_hours: operatingHours,
        region_city: extractRegionCity(address),
      };
    });

    // Insert in batches of 500
    let insertedCount = 0;
    for (let i = 0; i < rows.length; i += 500) {
      const batch = rows.slice(i, i + 500);
      const { error } = await supabase.from("safety_houses").insert(batch);
      if (error) {
        console.error("Insert error at batch", i, error);
        continue;
      }
      insertedCount += batch.length;
    }

    console.log(`Successfully inserted ${insertedCount} safety houses`);

    return new Response(JSON.stringify({ success: true, count: insertedCount }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("fetch-safety-houses error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
