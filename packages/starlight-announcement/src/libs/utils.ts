import picomatch from 'picomatch';
import type { AnnouncementConfig } from '../schemas/config';

/**
 * Check if a date string is within the specified range
 */
export function isWithinDateRange(
  startDate?: string,
  endDate?: string,
  now: Date = new Date()
): boolean {
  if (startDate) {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      console.warn(`[starlight-announcement] Invalid startDate: ${startDate}`);
      return false;
    }
    if (now < start) return false;
  }

  if (endDate) {
    const end = new Date(endDate);
    if (isNaN(end.getTime())) {
      console.warn(`[starlight-announcement] Invalid endDate: ${endDate}`);
      return false;
    }
    // Set end date to end of day for inclusive behavior
    end.setHours(23, 59, 59, 999);
    if (now > end) return false;
  }

  return true;
}

// Cache picomatch matchers to avoid recreating them on every check
const matcherCache = new Map<string, (path: string) => boolean>();

function getMatcher(pattern: string): (path: string) => boolean {
  let matcher = matcherCache.get(pattern);
  if (!matcher) {
    matcher = picomatch(pattern, { dot: true });
    matcherCache.set(pattern, matcher);
  }
  return matcher;
}

/**
 * Check if a pathname matches any of the given glob patterns
 */
export function matchesPatterns(pathname: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false;

  // Normalize pathname:
  // 1. Remove query strings and hashes
  // 2. Collapse multiple consecutive slashes
  // 3. Remove trailing slash (except for root)
  let normalizedPath = pathname.split('?')[0].split('#')[0];
  normalizedPath = normalizedPath.replace(/\/+/g, '/');
  if (normalizedPath.endsWith('/') && normalizedPath !== '/') {
    normalizedPath = normalizedPath.slice(0, -1);
  }

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
