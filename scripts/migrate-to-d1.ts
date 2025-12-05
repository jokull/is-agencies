import { readFile } from "fs/promises";
import { join } from "path";

const DUMP_DIR = ".dump";

interface ContentfulEntry {
  sys: { id: string };
  fields: any;
}

async function migrateToD1() {
  console.log("Reading dumped data...");

  // Read all JSON files
  const [agenciesData, tagsData, sizesData, imageMapData] = await Promise.all([
    readFile(join(DUMP_DIR, "agencies.json"), "utf-8"),
    readFile(join(DUMP_DIR, "tags.json"), "utf-8"),
    readFile(join(DUMP_DIR, "sizes.json"), "utf-8"),
    readFile(join(DUMP_DIR, "image-map.json"), "utf-8"),
  ]);

  const agencies: ContentfulEntry[] = JSON.parse(agenciesData);
  const tags: ContentfulEntry[] = JSON.parse(tagsData);
  const sizes: ContentfulEntry[] = JSON.parse(sizesData);
  const imageMap: any[] = JSON.parse(imageMapData);

  // Build image map lookup
  const imageUrlMap = new Map(imageMap.map((img) => [img.logoId, img.fileName]));

  console.log(`\nPreparing to migrate:`);
  console.log(`  ${sizes.length} sizes`);
  console.log(`  ${tags.length} tags`);
  console.log(`  ${agencies.length} agencies`);

  // Generate SQL statements
  const sqlStatements: string[] = [];

  // Insert sizes
  console.log("\nGenerating size inserts...");
  for (const size of sizes) {
    const id = size.sys.id;
    const label = size.fields.label;
    sqlStatements.push(
      `INSERT INTO sizes (id, label) VALUES ('${id}', '${label.replace(/'/g, "''")}');`,
    );
  }

  // Insert tags
  console.log("Generating tag inserts...");
  for (const tag of tags) {
    const id = tag.sys.id;
    const name = tag.fields.name;
    sqlStatements.push(
      `INSERT INTO tags (id, name) VALUES ('${id}', '${name.replace(/'/g, "''")}');`,
    );
  }

  // Insert agencies and agency_tags
  console.log("Generating agency inserts...");
  for (const agency of agencies) {
    const id = agency.sys.id;
    const name = agency.fields.name.replace(/'/g, "''");
    const url = agency.fields.url.replace(/'/g, "''");
    const founded = agency.fields.founded || null;

    // Get logo info
    let logoUrl = null;
    let logoId = null;
    if (agency.fields.logo?.sys?.id) {
      logoId = agency.fields.logo.sys.id;
      const fileName = imageUrlMap.get(logoId);
      if (fileName) {
        // This will be updated to R2 URL after upload
        logoUrl = `/images/${fileName}`;
      }
    }

    // Get size reference
    const sizeId = agency.fields.size?.sys?.id || null;

    sqlStatements.push(
      `INSERT INTO agencies (id, name, url, founded, logo_url, logo_id, size_id) VALUES ('${id}', '${name}', '${url}', ${founded}, ${logoUrl ? `'${logoUrl}'` : "NULL"}, ${logoId ? `'${logoId}'` : "NULL"}, ${sizeId ? `'${sizeId}'` : "NULL"});`,
    );

    // Insert agency-tag relationships
    if (agency.fields.tags && Array.isArray(agency.fields.tags)) {
      for (const tag of agency.fields.tags) {
        const tagId = tag.sys.id;
        sqlStatements.push(
          `INSERT INTO agency_tags (agency_id, tag_id) VALUES ('${id}', '${tagId}');`,
        );
      }
    }
  }

  // Write SQL file
  const sqlContent = sqlStatements.join("\n");
  const { writeFile } = await import("fs/promises");
  await writeFile(join(DUMP_DIR, "migration.sql"), sqlContent);

  console.log(`\n✓ Generated SQL migration file: ${DUMP_DIR}/migration.sql`);
  console.log(`  Total statements: ${sqlStatements.length}`);
  console.log("\nRun the following command to apply the migration:");
  console.log("  bunx wrangler d1 execute is-agencies-db --local --file=.dump/migration.sql");
}

migrateToD1().catch(console.error);
