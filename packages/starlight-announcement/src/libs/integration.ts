import type { AstroIntegration } from 'astro';
import type { PluginConfig } from '../schemas/config';
import { vitePluginStarlightAnnouncement } from './vite';

export function createAnnouncementIntegration(config: PluginConfig): AstroIntegration {
  return {
    name: 'starlight-announcement-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [vitePluginStarlightAnnouncement(config)],
          },
        });
      },
    },
  };
}
