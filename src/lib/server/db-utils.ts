/**
 * Type-safe database utilities for D1
 */

/**
 * Type guard to safely assert D1 query results
 */
export function isValidRows<T>(
  results: unknown[],
  validator: (row: unknown) => row is T,
): results is T[] {
  return results.every(validator);
}

/**
 * Safely map D1 results with type checking
 */
export function mapD1Results<T, R>(
  results: unknown[],
  validator: (row: unknown) => row is T,
  mapper: (row: T) => R,
): R[] {
  if (!isValidRows(results, validator)) {
    throw new Error("Invalid database result structure");
  }
  return results.map(mapper);
}
