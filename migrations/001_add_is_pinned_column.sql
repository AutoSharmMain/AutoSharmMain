-- Migration: Add is_pinned column to vehicles table
-- Description: Add a new boolean column to track pinned vehicles for home page featured section
-- Created: 2026-03-21

ALTER TABLE vehicles ADD COLUMN is_pinned BOOLEAN DEFAULT FALSE;

-- Create index for pinned vehicles queries
CREATE INDEX idx_vehicles_is_pinned ON vehicles(is_pinned);

-- Optional: Create a combined index for featured queries
CREATE INDEX idx_vehicles_is_pinned_status ON vehicles(is_pinned, status) WHERE is_pinned = TRUE AND status = 'available';
