import { fail } from "@sveltejs/kit";
import { getFormString } from "$lib/server/form-utils";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform, locals }) => {
  if (!locals.isAuthenticated) {
    return {
      isAuthenticated: false,
      agencies: [],
      agencyTags: [],
    };
  }

  const db = platform?.env?.DB;
  if (!db) {
    return {
      isAuthenticated: true,
      agencies: [],
      agencyTags: [],
    };
  }

  // Load all agencies (including hidden ones) with size information
  const agenciesResult = await db
    .prepare(
      `
      SELECT
        a.id, a.name, a.url, a.founded, a.logo_url, a.visible, a.slug,
        s.id as size_id, s.label as size, s.slug as size_slug
      FROM agencies a
      LEFT JOIN sizes s ON a.size_id = s.id
      ORDER BY a.name
    `,
    )
    .all();

  // Load all agency-tag relationships
  const agencyTagsResult = await db
    .prepare(
      `
      SELECT at.agency_id, t.id, t.name, t.slug
      FROM agency_tags at
      JOIN tags t ON at.tag_id = t.id
      ORDER BY t.name
    `,
    )
    .all();

  return {
    isAuthenticated: true,
    agencies: agenciesResult.results || [],
    agencyTags: agencyTagsResult.results || [],
  };
};

export const actions: Actions = {
  delete: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const db = platform?.env?.DB;
    if (!db) {
      return fail(500, { error: "Database not available" });
    }

    const data = await request.formData();
    const id = getFormString(data, "id");

    if (!id) {
      return fail(400, { error: "Agency ID required" });
    }

    try {
      // Delete agency (CASCADE will handle agency_tags junction table)
      await db.prepare("DELETE FROM agencies WHERE id = ?").bind(id).run();
      return { success: true, message: "Agency deleted" };
    } catch (error) {
      console.error("Delete error:", error);
      return fail(500, { error: "Failed to delete agency" });
    }
  },

  toggle_visible: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const db = platform?.env?.DB;
    if (!db) {
      return fail(500, { error: "Database not available" });
    }

    const data = await request.formData();
    const id = getFormString(data, "id");
    const currentVisible = getFormString(data, "visible") === "1";

    if (!id) {
      return fail(400, { error: "Agency ID required" });
    }

    try {
      // Toggle visibility: if currently visible (1), make hidden (0), and vice versa
      const newVisible = currentVisible ? 0 : 1;

      await db
        .prepare("UPDATE agencies SET visible = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
        .bind(newVisible, id)
        .run();

      return { success: true, message: `Agency ${newVisible ? "published" : "unpublished"}` };
    } catch (error) {
      console.error("Toggle visibility error:", error);
      return fail(500, { error: "Failed to toggle visibility" });
    }
  },
};
