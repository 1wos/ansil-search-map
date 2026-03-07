
ALTER TABLE programs ADD COLUMN IF NOT EXISTS portal_url TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS apply_method TEXT;

CREATE TABLE IF NOT EXISTS portals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  portal_name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE portals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read portals" ON portals FOR SELECT USING (true);
