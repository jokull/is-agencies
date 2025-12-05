/**
 * Utility functions for the application
 */

/**
 * Normalize a URL to ensure it has a protocol
 * Handles URLs with or without https:// prefix
 * @param url - The URL to normalize
 * @returns URL with https:// prefix
 */
export function normalizeUrl(url: string): string {
	if (!url) return '';

	// Remove any leading/trailing whitespace
	url = url.trim();

	// If already has protocol, return as-is
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}

	// Remove // prefix if present (from old protocol-relative format)
	if (url.startsWith('//')) {
		url = url.substring(2);
	}

	// Add https:// prefix
	return `https://${url}`;
}

/**
 * Ensure a URL has https:// prefix for storage
 * Used when saving URLs to database
 * @param url - The URL to ensure has protocol
 * @returns URL with https:// prefix
 */
export function ensureHttpsUrl(url: string): string {
	if (!url) return '';

	url = url.trim();

	// If already has https://, return as-is
	if (url.startsWith('https://')) {
		return url;
	}

	// If has http://, upgrade to https
	if (url.startsWith('http://')) {
		return url.replace('http://', 'https://');
	}

	// Remove // prefix if present
	if (url.startsWith('//')) {
		url = url.substring(2);
	}

	// Add https:// prefix
	return `https://${url}`;
}
