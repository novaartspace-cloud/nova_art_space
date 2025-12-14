-- Create exhibitions table
CREATE TABLE IF NOT EXISTS exhibitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  text TEXT,
  main_image TEXT,
  author TEXT,
  date TEXT,
  position INTEGER DEFAULT 0 NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exhibition_images table
CREATE TABLE IF NOT EXISTS exhibition_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id UUID NOT NULL REFERENCES exhibitions(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_exhibitions_slug ON exhibitions(slug);

-- Create index on position for faster sorting
CREATE INDEX IF NOT EXISTS idx_exhibitions_position ON exhibitions(position);

-- Create index on exhibition_id for faster joins
CREATE INDEX IF NOT EXISTS idx_exhibition_images_exhibition_id ON exhibition_images(exhibition_id);

-- Create index on image_order for proper sorting
CREATE INDEX IF NOT EXISTS idx_exhibition_images_order ON exhibition_images(exhibition_id, image_order);

-- Drop trigger and function if they exist (for re-running the script)
DROP TRIGGER IF EXISTS update_exhibitions_updated_at ON exhibitions;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create function to automatically update updated_at timestamp
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_exhibitions_updated_at
  BEFORE UPDATE ON exhibitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Drop existing policies if they exist (for re-running the script)
DROP POLICY IF EXISTS "Allow public read access exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Allow authenticated users to manage exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Allow public read access images" ON exhibition_images;
DROP POLICY IF EXISTS "Allow authenticated users to manage images" ON exhibition_images;

-- Enable Row Level Security (RLS)
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibition_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for exhibitions
CREATE POLICY "Allow public read access exhibitions"
  ON exhibitions
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to manage exhibitions
-- Adjust this based on your authentication needs
CREATE POLICY "Allow authenticated users to manage exhibitions"
  ON exhibitions
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create policy to allow public read access for images
CREATE POLICY "Allow public read access images"
  ON exhibition_images
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to manage images
CREATE POLICY "Allow authenticated users to manage images"
  ON exhibition_images
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Add comments to tables
COMMENT ON TABLE exhibitions IS 'Stores exhibition data with dates, positioning, and main image';
COMMENT ON TABLE exhibition_images IS 'Stores gallery images for exhibitions with ordering';

