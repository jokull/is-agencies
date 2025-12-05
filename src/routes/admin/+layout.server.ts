import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // Allow the root /admin page to show login form
  // All other admin routes require authentication
  if (!locals.isAuthenticated && url.pathname !== "/admin") {
    throw redirect(302, "/admin");
  }

  return {
    isAuthenticated: locals.isAuthenticated,
  };
};
