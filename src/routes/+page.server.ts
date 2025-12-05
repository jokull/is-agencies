import type { PageServerLoad } from "./$types";
import { mapD1Results } from "$lib/server/db-utils";

// Database result types
type AgencyRow = {
  id: string;
  name: string;
  url: string;
  founded?: number;
  logo_url?: string;
  size_id?: string;
  size?: string;
  size_slug?: string;
};

type AgencyTagRow = {
  agency_id: string;
  tag_id: string;
  tag_name: string;
  tag_slug: string;
};

type TagRow = {
  id: string;
  name: string;
  slug: string;
};

// Type guards
function isAgencyRow(row: unknown): row is AgencyRow {
  return (
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    typeof row.id === "string" &&
    "name" in row &&
    typeof row.name === "string" &&
    "url" in row &&
    typeof row.url === "string"
  );
}

function isAgencyTagRow(row: unknown): row is AgencyTagRow {
  return (
    typeof row === "object" &&
    row !== null &&
    "agency_id" in row &&
    typeof row.agency_id === "string" &&
    "tag_id" in row &&
    typeof row.tag_id === "string" &&
    "tag_name" in row &&
    typeof row.tag_name === "string" &&
    "tag_slug" in row &&
    typeof row.tag_slug === "string"
  );
}

function isTagRow(row: unknown): row is TagRow {
  return (
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    typeof row.id === "string" &&
    "name" in row &&
    typeof row.name === "string" &&
    "slug" in row &&
    typeof row.slug === "string"
  );
}

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
        WHERE a.visible = 1
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
    const agencyTagRows = mapD1Results(agencyTagsResult.results, isAgencyTagRow, (row) => row);

    for (const row of agencyTagRows) {
      const agencyId = row.agency_id;
      const tag = {
        id: row.tag_id,
        name: row.tag_name,
        slug: row.tag_slug,
      };

      if (!agencyTagsMap.has(agencyId)) {
        agencyTagsMap.set(agencyId, []);
      }
      agencyTagsMap.get(agencyId)!.push(tag);
    }

    // Transform to match Contentful structure
    const agencies = mapD1Results(agenciesResult.results, isAgencyRow, (row) => ({
      sys: { id: row.id },
      fields: {
        name: row.name,
        url: row.url,
        founded: row.founded,
        logo: row.logo_url
          ? {
              fields: {
                file: {
                  url: row.logo_url,
                },
              },
            }
          : undefined,
        size: row.size
          ? {
              sys: { id: row.size_id!, slug: row.size_slug! },
              fields: { label: row.size },
            }
          : undefined,
        tags:
          agencyTagsMap.get(row.id)?.map((tag) => ({
            sys: { id: tag.id, slug: tag.slug },
            fields: { name: tag.name },
          })) || [],
      },
    }));

    const tags = mapD1Results(tagsResult.results, isTagRow, (row) => ({
      sys: { id: row.id, slug: row.slug },
      fields: { name: row.name },
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
