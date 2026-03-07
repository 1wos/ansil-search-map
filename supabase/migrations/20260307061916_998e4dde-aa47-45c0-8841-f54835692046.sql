CREATE TABLE public.safety_houses (
  id SERIAL PRIMARY KEY,
  name TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  operating_hours TEXT,
  region_city TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.safety_houses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Safety houses are publicly readable"
  ON public.safety_houses
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage safety houses"
  ON public.safety_houses
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);