import { z } from 'astro/zod';

/**
 * Schema for a localizable string field.
 * Accepts either a simple string or an object with locale keys.
 */
export const localizableStringSchema = z.union([
  z.string(),
  z.record(z.string(), z.string()),
]);

export type LocalizableString = z.infer<typeof localizableStringSchema>;

/**
 * Validates announcement ID format.
 * Must be non-empty and contain only alphanumeric characters, hyphens, and underscores.
 */
const announcementIdSchema = z.string()
  .min(1, 'Announcement ID cannot be empty')
  .regex(/^[\w-]+$/, 'Announcement ID must contain only alphanumeric characters, hyphens, and underscores');

/**
 * Validates that a URL is safe (not javascript:, data:, or other dangerous protocols).
 */
const safeUrlSchema = z.string().refine(
  (url) => {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
      return false;
    }
    return true;
  },
  { message: 'javascript:, data:, and vbscript: URLs are not allowed.' }
);

const linkSchema = z.object({
  text: localizableStringSchema,
  href: safeUrlSchema,
});

/**
 * Validates ISO 8601 date string format (YYYY-MM-DD or full datetime).
 */
const isoDateSchema = z.string().refine(
  (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  },
  { message: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss).' }
);

const announcementSchema = z.object({
  /** Unique identifier for this announcement (used for dismissal persistence) */
  id: announcementIdSchema,
  /** The announcement content (supports HTML). Can be a string or locale map. */
  content: localizableStringSchema,
  /** Optional call-to-action link */
  link: linkSchema.optional(),
  /** Visual variant matching Starlight's aside styles */
  variant: z.enum(['note', 'tip', 'caution', 'danger']).default('note'),
  /** Whether the announcement can be dismissed */
  dismissible: z.boolean().default(true),
  /** Start date for scheduled display (ISO 8601 format) */
  startDate: isoDateSchema.optional(),
  /** End date for scheduled display (ISO 8601 format) */
  endDate: isoDateSchema.optional(),
  /** Glob patterns for pages where announcement should show */
  showOn: z.array(z.string()).default(['/**']),
  /** Glob patterns for pages where announcement should be hidden */
  hideOn: z.array(z.string()).default([]),
});

export const pluginConfigSchema = z.object({
  /** Whether announcements are enabled */
  enabled: z.boolean().default(true),
  /** How multiple announcements are displayed */
  displayMode: z.enum(['stack', 'first', 'rotate']).default('stack'),
  /** Interval in ms for rotating announcements (only for 'rotate' mode). Min: 500ms */
  rotateInterval: z.number()
    .int()
    .min(500, 'Rotation interval must be at least 500ms')
    .default(5000),
  /** Whether to show dot indicators in rotate mode */
  showRotateIndicator: z.boolean().default(true),
  /** Array of announcement configurations */
  announcements: z.array(announcementSchema).default([]),
}).superRefine((config, ctx) => {
  // Validate announcement ID uniqueness
  const ids = new Set<string>();
  for (let i = 0; i < config.announcements.length; i++) {
    const id = config.announcements[i]?.id;
    if (id && ids.has(id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate announcement ID: "${id}". Each announcement must have a unique ID.`,
        path: ['announcements', i, 'id'],
      });
    }
    if (id) {
      ids.add(id);
    }
  }
});

export type AnnouncementConfig = z.infer<typeof announcementSchema>;
export type PluginConfig = z.infer<typeof pluginConfigSchema>;
export type StarlightAnnouncementConfig = z.input<typeof pluginConfigSchema>;
