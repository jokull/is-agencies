import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform }) => {
  const db = platform?.env?.DB;

  if (!db) {
    // Fallback for local dev without platform
    return {
      agencies: [],
      tags: [],
    };
  }

  try {
    // Query agencies with their related data
    const agenciesResult = await db
      .prepare(
        `
        SELECT
          a.id,
          a.name,
          a.url,
          a.founded,
          a.logo_url,
          s.id as size_id,
          s.label as size,
          s.slug as size_slug
        FROM agencies a
        LEFT JOIN sizes s ON a.size_id = s.id
        ORDER BY a.name
      `,
      )
      .all();

    // Query all tags
    const tagsResult = await db.prepare("SELECT id, name, slug FROM tags ORDER BY name").all();

    // Query agency-tag relationships
    const agencyTagsResult = await db
      .prepare(
        `
        SELECT at.agency_id, t.id as tag_id, t.name as tag_name, t.slug as tag_slug
        FROM agency_tags at
        JOIN tags t ON at.tag_id = t.id
      `,
      )
      .all();

    // Build agency-tags map
    const agencyTagsMap = new Map<string, Array<{ id: string; name: string; slug: string }>>();
    for (const row of agencyTagsResult.results) {
      const agencyId = row.agency_id as string;
      const tag = {
        id: row.tag_id as string,
        name: row.tag_name as string,
        slug: row.tag_slug as string,
      };

      if (!agencyTagsMap.has(agencyId)) {
        agencyTagsMap.set(agencyId, []);
      }
      agencyTagsMap.get(agencyId)!.push(tag);
    }

    // Transform to match Contentful structure
    const agencies = agenciesResult.results.map((row) => ({
      sys: { id: row.id as string },
      fields: {
        name: row.name as string,
        url: row.url as string,
        founded: row.founded as number | undefined,
        logo: row.logo_url
          ? {
              fields: {
                file: {
                  url: row.logo_url as string,
                },
              },
            }
          : undefined,
        size: row.size
          ? {
              sys: { id: row.size_id as string, slug: row.size_slug as string },
              fields: { label: row.size as string },
            }
          : undefined,
        tags:
          agencyTagsMap.get(row.id as string)?.map((tag) => ({
            sys: { id: tag.id, slug: tag.slug },
            fields: { name: tag.name },
          })) || [],
      },
    }));

    const tags = tagsResult.results.map((row) => ({
      sys: { id: row.id as string, slug: row.slug as string },
      fields: { name: row.name as string },
    }));

    return {
      agencies,
      tags,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      agencies: [],
      tags: [],
    };
  }
};

// Disable prerendering since we're using D1 database at runtime
export const prerender = false;
