-- Create sizes table
CREATE TABLE sizes (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL
);

-- Create tags table
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create agencies table
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

-- Create agency_tags junction table
CREATE TABLE agency_tags (
  agency_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (agency_id, tag_id),
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_agencies_name ON agencies(name);
CREATE INDEX idx_agencies_size ON agencies(size_id);
CREATE INDEX idx_agency_tags_agency ON agency_tags(agency_id);
CREATE INDEX idx_agency_tags_tag ON agency_tags(tag_id);
