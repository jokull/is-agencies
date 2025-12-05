import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

const AUTH_COOKIE_NAME = "is_agencies_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies, platform } = event;

  // Skip auth logic during prerendering
  if (!platform) {
    event.locals.isAuthenticated = false;
    return resolve(event);
  }

  // Check if password query parameter is provided
  const passwordParam = url.searchParams.get("password");
  const secret = platform.env.SECRET;

  // Debug info
  const debugInfo = {
    hasPasswordParam: !!passwordParam,
    hasSecret: !!secret,
    passwordMatch: passwordParam && secret && passwordParam === secret,
    protocol: url.protocol,
    isProduction: url.protocol === "https:",
    hasCookie: !!cookies.get(AUTH_COOKIE_NAME),
    cookieValue: cookies.get(AUTH_COOKIE_NAME),
  };

  if (passwordParam && secret && passwordParam === secret) {
    // Set authentication cookie
    // Use secure: false in development (http://), true in production (https://)
    const isProduction = url.protocol === "https:";
    cookies.set(AUTH_COOKIE_NAME, "authenticated", {
      path: "/",
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    // Redirect to remove password from URL
    const cleanUrl = new URL(url);
    cleanUrl.searchParams.delete("password");
    throw redirect(302, cleanUrl.pathname + cleanUrl.search);
  }

  // Check if authentication cookie exists
  const authCookie = cookies.get(AUTH_COOKIE_NAME);
  event.locals.isAuthenticated = authCookie === "authenticated";

  const response = await resolve(event);

  // Add debug headers (only in dev or for admin routes)
  if (url.pathname.startsWith("/admin")) {
    response.headers.set("X-Auth-Debug", JSON.stringify(debugInfo));
    response.headers.set("X-Is-Authenticated", String(event.locals.isAuthenticated));
  }

  return response;
};
