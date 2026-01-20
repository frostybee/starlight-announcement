import type { Plugin } from 'vite';
import type { PluginConfig } from '../schemas/config';

const VIRTUAL_MODULE_ID = 'virtual:starlight-announcement/config';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export function vitePluginStarlightAnnouncement(config: PluginConfig): Plugin {
  const virtualModuleContent = `
export const displayMode = ${JSON.stringify(config.displayMode)};
export const rotateInterval = ${JSON.stringify(config.rotateInterval)};
export const announcements = ${JSON.stringify(config.announcements)};
`;

  return {
    name: 'vite-plugin-starlight-announcement',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return virtualModuleContent;
      }
    },
  };
}
