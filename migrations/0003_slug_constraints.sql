-- Drop existing indexes
DROP INDEX idx_tags_slug;
DROP INDEX idx_sizes_slug;

-- Recreate as UNIQUE indexes
CREATE UNIQUE INDEX idx_tags_slug ON tags(slug);
CREATE UNIQUE INDEX idx_sizes_slug ON sizes(slug);
