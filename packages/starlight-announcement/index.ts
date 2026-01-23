import type { StarlightPlugin } from '@astrojs/starlight/types';
import { pluginConfigSchema, type StarlightAnnouncementConfig } from './src/schemas/config';
import { createAnnouncementIntegration } from './src/libs/integration';
import { translations } from './src/translations';

export type { StarlightAnnouncementConfig, AnnouncementConfig, PluginConfig, LocalizableString } from './src/schemas/config';

export default function starlightAnnouncement(
  userConfig?: StarlightAnnouncementConfig
): StarlightPlugin {
  const config = pluginConfigSchema.parse(userConfig ?? {});

  return {
    name: 'starlight-announcement',
    hooks: {
      'i18n:setup': ({ injectTranslations }) => {
        injectTranslations(translations);
      },
      'config:setup': ({ addIntegration, updateConfig, config: starlightConfig }) => {
        // Override the Banner component with our announcement-aware version
        updateConfig({
          components: {
            ...starlightConfig.components,
            Banner: 'starlight-announcement/components/AnnouncementBanner.astro',
          },
        });

        // Add our Astro integration for the Vite plugin
        addIntegration(createAnnouncementIntegration(config));
      },
    },
  };
}
