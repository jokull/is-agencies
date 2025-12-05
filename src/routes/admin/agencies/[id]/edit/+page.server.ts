import { error, fail, redirect } from "@sveltejs/kit";
import { getFormString, getFormStringArray } from "$lib/server/form-utils";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, platform, locals }) => {
  if (!locals.isAuthenticated) {
    throw redirect(302, "/admin");
  }

  const db = platform?.env?.DB;
  if (!db) {
    throw new Error("Database not available");
  }

  const { id } = params;

  // Load agency
  const agencyResult = await db.prepare("SELECT * FROM agencies WHERE id = ?").bind(id).first();

  if (!agencyResult) {
    throw error(404, "Agency not found");
  }

  // Load tags and sizes
  const tagsResult = await db.prepare("SELECT * FROM tags ORDER BY name").all();
  const sizesResult = await db.prepare("SELECT * FROM sizes ORDER BY label").all();

  // Load current agency tags
  const currentTagsResult = await db
    .prepare("SELECT tag_id FROM agency_tags WHERE agency_id = ?")
    .bind(id)
    .all();

  const currentTagIds = (currentTagsResult.results || []).map(
    (row: { tag_id: string }) => row.tag_id,
  );

  return {
    agency: agencyResult,
    tags: tagsResult.results || [],
    sizes: sizesResult.results || [],
    currentTagIds,
  };
};

export const actions: Actions = {
  default: async ({ request, params, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const db = platform?.env?.DB;
    if (!db) {
      return fail(500, { error: "Database not available" });
    }

    const { id } = params;
    const data = await request.formData();
    const name = getFormString(data, "name");
    const url = getFormString(data, "url");
    const founded = getFormString(data, "founded");
    const logo_url = getFormString(data, "logo_url");
    const size_id = getFormString(data, "size_id");
    const tag_ids = getFormStringArray(data, "tag_ids");

    // Validation
    if (!name || !url) {
      return fail(400, { error: "Name and URL are required" });
    }

    // Generate new slug from name
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    try {
      // Update agency
      await db
        .prepare(
          `
          UPDATE agencies
          SET name = ?, url = ?, founded = ?, logo_url = ?, size_id = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
        )
        .bind(
          name,
          url,
          founded ? parseInt(founded) : null,
          logo_url || null,
          size_id || null,
          slug,
          id,
        )
        .run();

      // Delete all existing agency_tags for this agency
      await db.prepare("DELETE FROM agency_tags WHERE agency_id = ?").bind(id).run();

      // Insert new agency_tags
      for (const tag_id of tag_ids) {
        await db
          .prepare("INSERT INTO agency_tags (agency_id, tag_id) VALUES (?, ?)")
          .bind(id, tag_id)
          .run();
      }
    } catch (error) {
      console.error("Update agency error:", error);
      return fail(500, { error: "Failed to update agency" });
    }

    // Redirect after successful update
    throw redirect(303, "/admin");
  },
};
