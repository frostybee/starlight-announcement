import { z } from 'astro/zod';

const linkSchema = z.object({
  text: z.string(),
  href: z.string(),
});

const announcementSchema = z.object({
  /** Unique identifier for this announcement (used for dismissal persistence) */
  id: z.string(),
  /** The announcement content (supports HTML) */
  content: z.string(),
  /** Optional call-to-action link */
  link: linkSchema.optional(),
  /** Visual variant matching Starlight's aside styles */
  variant: z.enum(['note', 'tip', 'caution', 'danger']).default('note'),
  /** Whether the announcement can be dismissed */
  dismissible: z.boolean().default(true),
  /** Start date for scheduled display (ISO 8601 format) */
  startDate: z.string().optional(),
  /** End date for scheduled display (ISO 8601 format) */
  endDate: z.string().optional(),
  /** Glob patterns for pages where announcement should show */
  showOn: z.array(z.string()).default(['/**']),
  /** Glob patterns for pages where announcement should be hidden */
  hideOn: z.array(z.string()).default([]),
});

export const pluginConfigSchema = z.object({
  /** How multiple announcements are displayed */
  displayMode: z.enum(['stack', 'first', 'rotate']).default('stack'),
  /** Interval in ms for rotating announcements (only for 'rotate' mode) */
  rotateInterval: z.number().int().positive().default(5000),
  /** Array of announcement configurations */
  announcements: z.array(announcementSchema).default([]),
});

export type AnnouncementConfig = z.infer<typeof announcementSchema>;
export type PluginConfig = z.infer<typeof pluginConfigSchema>;
export type StarlightAnnouncementConfig = z.input<typeof pluginConfigSchema>;
