-- SQL скрипт за създаване на таблицата carousel_mobile_slides в Supabase
-- Таблицата е идентична с carousel_slides, но за мобилни устройства

-- Създаване на таблицата
CREATE TABLE IF NOT EXISTS carousel_mobile_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Създаване на индекс за по-бързо сортиране по позиция
CREATE INDEX IF NOT EXISTS idx_carousel_mobile_slides_position ON carousel_mobile_slides(position);

-- Създаване на функция за автоматично обновяване на updated_at
CREATE OR REPLACE FUNCTION update_carousel_mobile_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Създаване на trigger за автоматично обновяване на updated_at
CREATE TRIGGER update_carousel_mobile_slides_updated_at
  BEFORE UPDATE ON carousel_mobile_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_carousel_mobile_slides_updated_at();

-- RLS (Row Level Security) политики - разрешаване на четене за всички
ALTER TABLE carousel_mobile_slides ENABLE ROW LEVEL SECURITY;

-- Политика за четене (публичен достъп)
CREATE POLICY "Allow public read access to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR SELECT
  USING (true);

-- Политика за вмъкване (само за автентифицирани потребители)
CREATE POLICY "Allow authenticated insert to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Политика за обновяване (само за автентифицирани потребители)
CREATE POLICY "Allow authenticated update to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Политика за изтриване (само за автентифицирани потребители)
CREATE POLICY "Allow authenticated delete to carousel_mobile_slides"
  ON carousel_mobile_slides
  FOR DELETE
  USING (auth.role() = 'authenticated');

