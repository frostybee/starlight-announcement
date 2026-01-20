declare module 'virtual:starlight-announcement/config' {
  export const displayMode: 'stack' | 'first' | 'rotate';
  export const rotateInterval: number;
  export const announcements: Array<{
    id: string;
    content: string;
    link?: {
      text: string;
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
