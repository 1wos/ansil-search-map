import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Portal {
  id: string;
  region: string;
  portal_name: string;
  url: string;
  description: string | null;
}

export function usePortals() {
  return useQuery({
    queryKey: ["portals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portals" as any)
        .select("*")
        .order("region");
      if (error) throw error;
      return data as unknown as Portal[];
    },
  });
}
