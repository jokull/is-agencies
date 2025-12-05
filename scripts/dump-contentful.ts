import { createClient } from "contentful";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const DUMP_DIR = ".dump";

async function dumpContentful() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  console.log("Fetching data from Contentful...");

  // Fetch all content types
  const [agencies, tags, sizes] = await Promise.all([
    client.getEntries({ content_type: "agency", limit: 1000 }),
    client.getEntries({ content_type: "tag", limit: 1000 }),
    client.getEntries({ content_type: "size", limit: 1000 }),
  ]);

  // Create dump directory structure
  await mkdir(join(DUMP_DIR, "images"), { recursive: true });

  console.log(`Found ${agencies.items.length} agencies`);
  console.log(`Found ${tags.items.length} tags`);
  console.log(`Found ${sizes.items.length} sizes`);

  // Save raw data
  await writeFile(join(DUMP_DIR, "agencies.json"), JSON.stringify(agencies.items, null, 2));
  await writeFile(join(DUMP_DIR, "tags.json"), JSON.stringify(tags.items, null, 2));
  await writeFile(join(DUMP_DIR, "sizes.json"), JSON.stringify(sizes.items, null, 2));

  console.log("Saved JSON data to .dump/");

  // Download images
  console.log("\nDownloading images...");
  let imageCount = 0;

  for (const agency of agencies.items) {
    const fields = agency.fields as any;
    if (fields.logo && fields.logo.fields?.file) {
      const logoUrl = fields.logo.fields.file.url;
      if (logoUrl) {
        const url = logoUrl.startsWith("//") ? `https:${logoUrl}` : logoUrl;
        const fileName = fields.logo.sys.id + "-" + fields.logo.fields.file.fileName;

        try {
          const response = await fetch(url);
          if (response.ok) {
            const buffer = await response.arrayBuffer();
            await writeFile(join(DUMP_DIR, "images", fileName), Buffer.from(buffer));
            imageCount++;
            console.log(`  Downloaded: ${fileName}`);
          }
        } catch (error) {
          console.error(`  Failed to download ${fileName}:`, error);
        }
      }
    }
  }

  console.log(`\nDownloaded ${imageCount} images`);

  // Create a metadata file with image mappings
  const imageMap = agencies.items
    .filter((agency: any) => agency.fields.logo?.fields?.file)
    .map((agency: any) => ({
      agencyId: agency.sys.id,
      agencyName: agency.fields.name,
      logoId: agency.fields.logo.sys.id,
      fileName: agency.fields.logo.sys.id + "-" + agency.fields.logo.fields.file.fileName,
      originalUrl: agency.fields.logo.fields.file.url,
      contentType: agency.fields.logo.fields.file.contentType,
    }));

  await writeFile(join(DUMP_DIR, "image-map.json"), JSON.stringify(imageMap, null, 2));

  console.log("\nDump complete!");
  console.log(`All data saved to ${DUMP_DIR}/`);
}

dumpContentful().catch(console.error);
