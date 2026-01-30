import picomatch from 'picomatch';
import type { AnnouncementConfig } from '../schemas/config';

/** Type for picomatch matcher function */
type Matcher = (path: string) => boolean;

/**
 * Check if a date string is within the specified range.
 *
 * All comparisons are done in UTC for consistency:
 * - Date strings are parsed as UTC (ISO 8601 format recommended: YYYY-MM-DD)
 * - The current time is converted to UTC for comparison
 * - End dates include the entire day (23:59:59.999 UTC)
 */
export function isWithinDateRange(
  startDate?: string,
  endDate?: string,
  now: Date = new Date()
): boolean {
  const nowUtc = now.getTime();

  if (startDate) {
    const start = new Date(startDate);
    if (nowUtc < start.getTime()) return false;
  }

  if (endDate) {
    const end = new Date(endDate);
    // Set end date to end of day in UTC for inclusive end date behavior
    end.setUTCHours(23, 59, 59, 999);
    if (nowUtc > end.getTime()) return false;
  }

  return true;
}

// Cache picomatch matchers with LRU eviction to avoid recreating them on every check
// Limit cache size to prevent unbounded memory growth in long-running servers
const MATCHER_CACHE_MAX_SIZE = 100;
const matcherCache = new Map<string, Matcher>();

/**
 * Get a cached picomatch matcher for a pattern.
 * Uses LRU eviction when cache is full.
 */
function getMatcher(pattern: string): Matcher {
  const cached = matcherCache.get(pattern);
  if (cached) {
    // LRU: Move to end by re-inserting (Map maintains insertion order)
    matcherCache.delete(pattern);
    matcherCache.set(pattern, cached);
    return cached;
  }

  // Evict least-recently-used entry (first in Map) if cache is full
  if (matcherCache.size >= MATCHER_CACHE_MAX_SIZE) {
    const firstKey = matcherCache.keys().next().value;
    // Explicit undefined check for type safety
    if (firstKey !== undefined) {
      matcherCache.delete(firstKey);
    }
  }

  const matcher: Matcher = picomatch(pattern, { dot: true });
  matcherCache.set(pattern, matcher);
  return matcher;
}

/**
 * Clear the matcher cache (for testing and HMR).
 */
export function clearMatcherCache(): void {
  matcherCache.clear();
}

// Handle Vite HMR - clear cache when module is disposed
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    clearMatcherCache();
  });
}

/**
 * Normalize a pathname for pattern matching.
 * - Removes query strings and hashes
 * - Collapses multiple consecutive slashes
 * - Removes trailing slash (except for root)
 */
function normalizePath(pathname: string): string {
  // Remove query string
  const queryIndex = pathname.indexOf('?');
  let path = queryIndex >= 0 ? pathname.slice(0, queryIndex) : pathname;

  // Remove hash
  const hashIndex = path.indexOf('#');
  path = hashIndex >= 0 ? path.slice(0, hashIndex) : path;

  // Collapse multiple slashes
  path = path.replace(/\/+/g, '/');

  // Remove trailing slash (except for root)
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path || '/';
}

/**
 * Check if a pathname matches any of the given glob patterns.
 */
export function matchesPatterns(pathname: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false;

  const normalizedPath = normalizePath(pathname);
  return patterns.some((pattern) => getMatcher(pattern)(normalizedPath));
}

/**
 * Determine if an announcement should be visible for a given path
 */
export function shouldShowOnPath(
  announcement: AnnouncementConfig,
  pathname: string
): boolean {
  const { showOn, hideOn } = announcement;

  // Check hideOn first - if matches, don't show
  if (matchesPatterns(pathname, hideOn)) {
    return false;
  }

  // Then check showOn - must match to show
  return matchesPatterns(pathname, showOn);
}

/**
 * Get all announcements that should be active for the given path and time
 */
export function getActiveAnnouncements(
  announcements: AnnouncementConfig[],
  pathname: string,
  now: Date = new Date()
): AnnouncementConfig[] {
  return announcements.filter((announcement) => {
    // Check date range
    if (!isWithinDateRange(announcement.startDate, announcement.endDate, now)) {
      return false;
    }

    // Check path targeting
    if (!shouldShowOnPath(announcement, pathname)) {
      return false;
    }

    return true;
  });
}
