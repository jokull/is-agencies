import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DUMP_DIR = ".dump";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

async function backfillSlugs() {
  console.log("Reading data...");

  // Read tags and sizes from dump
  const [tagsData, sizesData] = await Promise.all([
    readFile(join(DUMP_DIR, "tags.json"), "utf-8"),
    readFile(join(DUMP_DIR, "sizes.json"), "utf-8"),
  ]);

  const tags: any[] = JSON.parse(tagsData);
  const sizes: any[] = JSON.parse(sizesData);

  console.log(`Found ${tags.length} tags and ${sizes.length} sizes`);

  // Generate SQL for tags
  const tagsSql: string[] = [];
  for (const tag of tags) {
    const id = tag.sys.id;
    const name = tag.fields.name;
    const slug = slugify(name);
    tagsSql.push(`UPDATE tags SET slug = '${slug}' WHERE id = '${id}';`);
    console.log(`  Tag: "${name}" -> "${slug}"`);
  }

  // Generate SQL for sizes
  const sizesSql: string[] = [];
  for (const size of sizes) {
    const id = size.sys.id;
    const label = size.fields.label;
    const slug = slugify(label);
    sizesSql.push(`UPDATE sizes SET slug = '${slug}' WHERE id = '${id}';`);
    console.log(`  Size: "${label}" -> "${slug}"`);
  }

  // Combine all SQL
  const allSql = [...tagsSql, ...sizesSql];

  // Write SQL file
  await writeFile(join(DUMP_DIR, "backfill-slugs.sql"), allSql.join("\n"));

  console.log(`\n✓ Generated SQL backfill file: ${DUMP_DIR}/backfill-slugs.sql`);
  console.log(`  Total statements: ${allSql.length}`);
  console.log("\nRun the following command to apply the backfill:");
  console.log("  bunx wrangler d1 execute is-agencies-db --local --file=.dump/backfill-slugs.sql");
}

backfillSlugs().catch(console.error);
