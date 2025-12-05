-- Add NOT NULL constraints to slug columns
-- Note: Slugs have already been backfilled, so this is safe to run
-- This migration recreates tables in the correct order to respect FK constraints

-- Step 1: Back up all data to regular tables (D1 doesn't support TEMPORARY)
CREATE TABLE agency_tags_backup AS SELECT * FROM agency_tags;
CREATE TABLE agencies_backup AS SELECT * FROM agencies;
CREATE TABLE tags_backup AS SELECT * FROM tags;
CREATE TABLE sizes_backup AS SELECT * FROM sizes;

-- Step 2: Drop tables in reverse dependency order
DROP TABLE agency_tags;
DROP TABLE agencies;
DROP TABLE tags;
DROP TABLE sizes;

-- Step 3: Recreate sizes table with NOT NULL constraint on slug
CREATE TABLE sizes (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  slug TEXT NOT NULL
);

INSERT INTO sizes SELECT * FROM sizes_backup;

-- Step 4: Recreate tags table with NOT NULL constraint on slug
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL
);

INSERT INTO tags SELECT * FROM tags_backup;

-- Step 5: Recreate agencies table (depends on sizes)
CREATE TABLE agencies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  founded INTEGER,
  logo_url TEXT,
  logo_id TEXT,
  size_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);

INSERT INTO agencies SELECT * FROM agencies_backup;

-- Step 6: Recreate agency_tags table (depends on agencies and tags)
CREATE TABLE agency_tags (
  agency_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (agency_id, tag_id),
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

INSERT INTO agency_tags SELECT * FROM agency_tags_backup;

-- Step 7: Recreate all indexes
CREATE UNIQUE INDEX idx_tags_slug ON tags(slug);
CREATE UNIQUE INDEX idx_sizes_slug ON sizes(slug);
CREATE INDEX idx_agencies_name ON agencies(name);
CREATE INDEX idx_agencies_size ON agencies(size_id);
CREATE INDEX idx_agency_tags_agency ON agency_tags(agency_id);
CREATE INDEX idx_agency_tags_tag ON agency_tags(tag_id);

-- Step 8: Clean up temporary tables
DROP TABLE agency_tags_backup;
DROP TABLE agencies_backup;
DROP TABLE tags_backup;
DROP TABLE sizes_backup;
