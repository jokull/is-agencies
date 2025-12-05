-- Add slug column to agencies table
ALTER TABLE agencies ADD COLUMN slug TEXT;

-- Create index for slug lookups
CREATE INDEX idx_agencies_slug ON agencies(slug);
