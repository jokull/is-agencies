#!/usr/bin/env bun
/**
 * Import data from production D1 to local D1
 * Run with: bun scripts/import-from-production.ts
 */

import { $ } from "bun";
import { writeFileSync } from "fs";

console.log("📥 Exporting from production...");

// Export all tables from production
await $`bunx wrangler d1 execute is-agencies-db --remote --command "SELECT * FROM agencies" --json > /tmp/agencies.json`;
await $`bunx wrangler d1 execute is-agencies-db --remote --command "SELECT * FROM agency_tags" --json > /tmp/agency_tags.json`;
await $`bunx wrangler d1 execute is-agencies-db --remote --command "SELECT * FROM tags" --json > /tmp/tags.json`;
await $`bunx wrangler d1 execute is-agencies-db --remote --command "SELECT * FROM sizes" --json > /tmp/sizes.json`;

console.log("✅ Export complete");

// Read the JSON files
const agenciesData = await Bun.file("/tmp/agencies.json").json();
const agencyTagsData = await Bun.file("/tmp/agency_tags.json").json();
const tagsData = await Bun.file("/tmp/tags.json").json();
const sizesData = await Bun.file("/tmp/sizes.json").json();

const agencies = agenciesData[0].results;
const agencyTags = agencyTagsData[0].results;
const tags = tagsData[0].results;
const sizes = sizesData[0].results;

console.log(`\n📊 Found:`);
console.log(`  - ${agencies.length} agencies`);
console.log(`  - ${tags.length} tags`);
console.log(`  - ${sizes.length} sizes`);
console.log(`  - ${agencyTags.length} agency-tag relationships`);

console.log("\n🔄 Importing to local database...");

// Build SQL file with all inserts
let sql = "";

// Import sizes first (referenced by agencies)
for (const size of sizes) {
  const id = size.id.replace(/'/g, "''");
  const label = size.label.replace(/'/g, "''");
  const slug = size.slug.replace(/'/g, "''");
  sql += `INSERT OR REPLACE INTO sizes (id, label, slug) VALUES ('${id}', '${label}', '${slug}');\n`;
}

// Import tags
for (const tag of tags) {
  const id = tag.id.replace(/'/g, "''");
  const name = tag.name.replace(/'/g, "''");
  const slug = tag.slug.replace(/'/g, "''");
  sql += `INSERT OR REPLACE INTO tags (id, name, slug) VALUES ('${id}', '${name}', '${slug}');\n`;
}

// Import agencies (without slug field)
for (const agency of agencies) {
  const id = agency.id.replace(/'/g, "''");
  const name = agency.name.replace(/'/g, "''");
  const url = agency.url.replace(/'/g, "''");
  const founded = agency.founded ? agency.founded : "NULL";
  const logoUrl = agency.logo_url ? `'${agency.logo_url.replace(/'/g, "''")}'` : "NULL";
  const logoId = agency.logo_id ? `'${agency.logo_id.replace(/'/g, "''")}'` : "NULL";
  const sizeId = agency.size_id ? `'${agency.size_id.replace(/'/g, "''")}'` : "NULL";
  const visible = agency.visible !== undefined ? agency.visible : 1;
  const createdAt = agency.created_at.replace(/'/g, "''");
  const updatedAt = agency.updated_at.replace(/'/g, "''");

  sql += `INSERT OR REPLACE INTO agencies (id, name, url, founded, logo_url, logo_id, size_id, visible, created_at, updated_at) VALUES ('${id}', '${name}', '${url}', ${founded}, ${logoUrl}, ${logoId}, ${sizeId}, ${visible}, '${createdAt}', '${updatedAt}');\n`;
}

// Import agency_tags
for (const at of agencyTags) {
  const agencyId = at.agency_id.replace(/'/g, "''");
  const tagId = at.tag_id.replace(/'/g, "''");
  sql += `INSERT OR REPLACE INTO agency_tags (agency_id, tag_id) VALUES ('${agencyId}', '${tagId}');\n`;
}

// Write SQL to temp file
writeFileSync("/tmp/import.sql", sql);

// Execute the SQL file
await $`bunx wrangler d1 execute is-agencies-db --local --file /tmp/import.sql`;

console.log("\n✅ Import complete!");

// Clean up temp files
await $`rm /tmp/agencies.json /tmp/agency_tags.json /tmp/tags.json /tmp/sizes.json /tmp/import.sql`;

console.log("\n🎉 Done! Run 'bun run dev' to see your local data.");
