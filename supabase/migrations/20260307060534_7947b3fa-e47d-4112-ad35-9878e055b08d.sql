CREATE OR REPLACE FUNCTION get_region_stats()
RETURNS TABLE (
  region_city TEXT, total_count BIGINT,
  safety_count BIGINT, commute_count BIGINT,
  living_count BIGINT, health_count BIGINT, community_count BIGINT
)
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT region_city, COUNT(*) AS total_count,
    COUNT(*) FILTER (WHERE category = '주거안전') AS safety_count,
    COUNT(*) FILTER (WHERE category = '귀가안전') AS commute_count,
    COUNT(*) FILTER (WHERE category = '생활지원') AS living_count,
    COUNT(*) FILTER (WHERE category = '건강') AS health_count,
    COUNT(*) FILTER (WHERE category = '커뮤니티') AS community_count
  FROM programs GROUP BY region_city ORDER BY total_count DESC;
$$;