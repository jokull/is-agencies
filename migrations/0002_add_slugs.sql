-- Add slug columns to tags and sizes
ALTER TABLE tags ADD COLUMN slug TEXT;
ALTER TABLE sizes ADD COLUMN slug TEXT;

-- Create indexes for slug lookups (UNIQUE will be added after backfill)
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_sizes_slug ON sizes(slug);
