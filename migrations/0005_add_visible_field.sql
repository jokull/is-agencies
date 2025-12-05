-- Migration: Add visible field to agencies table
-- SQLite uses INTEGER for boolean: 1 = visible, 0 = hidden

-- Add visible column with default value of 1 (visible)
ALTER TABLE agencies ADD COLUMN visible INTEGER NOT NULL DEFAULT 1;

-- Create index for efficient filtering by visibility
CREATE INDEX idx_agencies_visible ON agencies(visible);
