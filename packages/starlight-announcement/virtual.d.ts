declare module 'virtual:starlight-announcement/config' {
  import type { AnnouncementConfig } from './src/schemas/config';

  export const displayMode: 'stack' | 'first' | 'rotate';
  export const rotateInterval: number;
  export const showRotateIndicator: boolean;
  export const announcements: AnnouncementConfig[];
}
