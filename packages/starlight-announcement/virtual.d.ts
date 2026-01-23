declare module 'virtual:starlight-announcement/config' {
  export type LocalizableString = string | Record<string, string>;

  export const displayMode: 'stack' | 'first' | 'rotate';
  export const rotateInterval: number;
  export const announcements: Array<{
    id: string;
    content: LocalizableString;
    link?: {
      text: LocalizableString;
      href: string;
    };
    variant: 'note' | 'tip' | 'caution' | 'danger';
    dismissible: boolean;
    startDate?: string;
    endDate?: string;
    showOn: string[];
    hideOn: string[];
  }>;
}
