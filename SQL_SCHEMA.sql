-- Create vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('car', 'motorcycle', 'scooter')),
  listing_type VARCHAR(50) NOT NULL CHECK (listing_type IN ('rent', 'sale')),
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'EGP')),
  price_period VARCHAR(50) CHECK (price_period IN ('day', 'month', NULL)),
  status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'sold')),
  description TEXT,
  image VARCHAR(500),
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  characteristics JSONB DEFAULT '{}'::JSONB,
  reviews JSONB[] DEFAULT ARRAY[]::JSONB[],
  specs JSONB NOT NULL DEFAULT '{}'::JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  inquiries INT DEFAULT 0,
  seasonal_price DECIMAL(10, 2),
  discount INT DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  discount_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_specs CHECK (specs IS NOT NULL)
);

-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  read_more_url VARCHAR(500),
  date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_vehicles_category ON vehicles(category);
CREATE INDEX idx_vehicles_listing_type ON vehicles(listing_type);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_is_featured ON vehicles(is_featured);
CREATE INDEX idx_vehicles_is_pinned ON vehicles(is_pinned);
CREATE INDEX idx_vehicles_is_pinned_status ON vehicles(is_pinned, status) WHERE is_pinned = TRUE AND status = 'available';
CREATE INDEX idx_news_date ON news(date DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Allow public read access (optional - adjust based on your needs)
CREATE POLICY "Enable read access for all users" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON news FOR SELECT USING (true);

-- Create a trigger to auto-update the updated_at timestamp for vehicles
CREATE OR REPLACE FUNCTION update_vehicles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_update_timestamp
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_vehicles_timestamp();

-- Create a trigger to auto-update the updated_at timestamp for news
CREATE OR REPLACE FUNCTION update_news_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_update_timestamp
BEFORE UPDATE ON news
FOR EACH ROW
EXECUTE FUNCTION update_news_timestamp();
