/**
 * i18n utilities for resolving localized announcement content.
 */

import type { LocalizableString } from '../schemas/config';

export type { LocalizableString };

// Cached default locale from Starlight config
let cachedDefaultLocale: string | undefined;
let defaultLocaleResolved = false;

/**
 * Get the default locale from Starlight configuration.
 */
export function getDefaultLocale(): string | undefined {
  if (defaultLocaleResolved) {
    return cachedDefaultLocale;
  }

  try {
    const starlightConfig = import.meta.env.STARLIGHT_LOCALES;
    if (starlightConfig) {
      const locales = JSON.parse(starlightConfig) as Record<string, { lang?: string }>;
      for (const [key, value] of Object.entries(locales)) {
        if (key === 'root') {
          cachedDefaultLocale = value.lang || 'en';
          break;
        }
      }
      if (!cachedDefaultLocale) {
        cachedDefaultLocale = 'en';
      }
    }
  } catch (e) {
    console.warn('[starlight-announcement] Failed to parse STARLIGHT_LOCALES:', e);
    cachedDefaultLocale = 'en';
  }

  defaultLocaleResolved = true;
  return cachedDefaultLocale;
}

/**
 * Resolve a localizable string to its value for the given locale.
 *
 * Fallback chain:
 * 1. Exact locale match (e.g., 'fr')
 * 2. Default locale (e.g., 'en')
 * 3. 'en' as universal fallback
 * 4. First available value in the record
 */
export function resolveLocalizedString(
  value: LocalizableString | undefined,
  locale: string | undefined,
  defaultLocale: string | undefined
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  // Simple string - return as-is
  if (typeof value === 'string') {
    return value;
  }

  const record = value as Record<string, string>;
  const availableLocales = Object.keys(record);

  // 1. Try exact locale match
  if (locale && record[locale]) {
    return record[locale];
  }

  // 2. Try default locale
  if (defaultLocale && record[defaultLocale]) {
    return record[defaultLocale];
  }

  // 3. Try 'en' as universal fallback
  if (record['en']) {
    return record['en'];
  }

  // 4. Return first available value
  const values = Object.values(record);
  if (values.length > 0) {
    return values[0];
  }

  return undefined;
}

/**
 * Check if a value is a localizable record (not a simple string).
 */
export function isLocalizableRecord(
  value: LocalizableString | undefined
): value is Record<string, string> {
  return value !== undefined && value !== null && typeof value === 'object';
}

/**
 * Reset cached default locale (for testing and HMR).
 */
export function resetDefaultLocaleCache(): void {
  cachedDefaultLocale = undefined;
  defaultLocaleResolved = false;
}

// Handle Vite HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    resetDefaultLocaleCache();
  });
}
