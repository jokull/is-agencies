import { fail } from '@sveltejs/kit';
import { getFormString } from '$lib/server/form-utils';
import type { Actions, PageServerLoad } from './$types';
import { createDb, schema } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, locals }) => {
  if (!locals.isAuthenticated) {
    return {
      isAuthenticated: false,
      agencies: [],
      agencyTags: [],
    };
  }

  if (!platform?.env?.DB) {
    return {
      isAuthenticated: true,
      agencies: [],
      agencyTags: [],
    };
  }

  const db = createDb(platform.env.DB);

  // Load all agencies (including hidden ones) with size information
  const agencies = await db.query.agencies.findMany({
    with: {
      size: true,
    },
    orderBy: (agencies, { asc }) => [asc(agencies.name)],
  });

  // Load all agency-tag relationships with tag details
  const agencyTagsWithTags = await db.query.agencyTags.findMany({
    with: {
      tag: true,
    },
  });

  // Transform to match expected structure
  const agencyTags = agencyTagsWithTags.map((at) => ({
    agency_id: at.agencyId,
    id: at.tag.id,
    name: at.tag.name,
    slug: at.tag.slug,
  }));

  return {
    isAuthenticated: true,
    agencies,
    agencyTags,
  };
};

export const actions: Actions = {
  delete: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: 'Unauthorized' });
    }

    if (!platform?.env?.DB) {
      return fail(500, { error: 'Database not available' });
    }

    const db = createDb(platform.env.DB);
    const data = await request.formData();
    const id = getFormString(data, 'id');

    if (!id) {
      return fail(400, { error: 'Agency ID required' });
    }

    try {
      // Delete agency (CASCADE will handle agency_tags junction table)
      await db.delete(schema.agencies).where(eq(schema.agencies.id, id));
      return { success: true, message: 'Agency deleted' };
    } catch (error) {
      console.error('Delete error:', error);
      return fail(500, { error: 'Failed to delete agency' });
    }
  },

  toggle_visible: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: 'Unauthorized' });
    }

    if (!platform?.env?.DB) {
      return fail(500, { error: 'Database not available' });
    }

    const db = createDb(platform.env.DB);
    const data = await request.formData();
    const id = getFormString(data, 'id');
    const currentVisible = getFormString(data, 'visible') === '1';

    if (!id) {
      return fail(400, { error: 'Agency ID required' });
    }

    try {
      // Toggle visibility
      const newVisible = !currentVisible;

      await db
        .update(schema.agencies)
        .set({
          visible: newVisible,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(schema.agencies.id, id));

      return {
        success: true,
        message: `Agency ${newVisible ? 'published' : 'unpublished'}`,
      };
    } catch (error) {
      console.error('Toggle visibility error:', error);
      return fail(500, { error: 'Failed to toggle visibility' });
    }
  },
};
