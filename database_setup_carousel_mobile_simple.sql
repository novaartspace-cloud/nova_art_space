-- Опростен SQL скрипт за създаване на таблицата carousel_mobile_slides
-- Изпълни това в Supabase SQL Editor

-- Стъпка 1: Създаване на таблицата
CREATE TABLE carousel_mobile_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Стъпка 2: Създаване на индекс
CREATE INDEX idx_carousel_mobile_slides_position ON carousel_mobile_slides(position);

-- Стъпка 3: Функция за автоматично обновяване
CREATE OR REPLACE FUNCTION update_carousel_mobile_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Стъпка 4: Trigger за автоматично обновяване
CREATE TRIGGER update_carousel_mobile_slides_updated_at
  BEFORE UPDATE ON carousel_mobile_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_carousel_mobile_slides_updated_at();

-- Стъпка 5: Включване на RLS
ALTER TABLE carousel_mobile_slides ENABLE ROW LEVEL SECURITY;

-- Стъпка 6: Политики за достъп
CREATE POLICY "Allow public read access to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR DELETE
  USING (auth.role() = 'authenticated');

