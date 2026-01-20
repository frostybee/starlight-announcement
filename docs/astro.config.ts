import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightAnnouncement from 'starlight-announcement'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Starlight Announcement',
      editLink: {
        baseUrl: 'https://github.com/frostybee/starlight-announcement/edit/main/docs/',
      },
      plugins: [
        starlightAnnouncement({
          displayMode: 'stack',
          announcements: [
            // Global welcome announcement (except demo pages)
            {
              id: 'welcome-announcement',
              content: 'Welcome to starlight-announcement plugin!',
              variant: 'tip',
              link: {
                text: 'Get Started',
                href: '/getting-started/',
              },
              hideOn: ['/demos/**'],
            },

            // === VARIANTS DEMO ===
            {
              id: 'demo-variant-note',
              content: 'This is a <strong>note</strong> variant - great for general information.',
              variant: 'note',
              showOn: ['/demos/variants', '/demos/variants/**'],
            },
            {
              id: 'demo-variant-tip',
              content: 'This is a <strong>tip</strong> variant - perfect for positive news!',
              variant: 'tip',
              showOn: ['/demos/variants', '/demos/variants/**'],
            },
            {
              id: 'demo-variant-caution',
              content: 'This is a <strong>caution</strong> variant - use for warnings.',
              variant: 'caution',
              showOn: ['/demos/variants', '/demos/variants/**'],
            },
            {
              id: 'demo-variant-danger',
              content: 'This is a <strong>danger</strong> variant - for critical alerts!',
              variant: 'danger',
              showOn: ['/demos/variants', '/demos/variants/**'],
            },

            // === LINKS DEMO ===
            {
              id: 'demo-internal-link',
              content: 'New to the plugin? Check out our guide!',
              variant: 'tip',
              link: {
                text: 'Getting Started',
                href: '/getting-started/',
              },
              showOn: ['/demos/links', '/demos/links/**'],
            },
            {
              id: 'demo-external-link',
              content: 'Star us on GitHub if you find this useful!',
              variant: 'note',
              link: {
                text: 'GitHub Repository',
                href: 'https://github.com/frostybee/starlight-announcement',
              },
              showOn: ['/demos/links', '/demos/links/**'],
            },
            {
              id: 'demo-no-link',
              content: 'This announcement has no link - just informational text.',
              variant: 'caution',
              showOn: ['/demos/links', '/demos/links/**'],
            },

            // === DISMISSIBLE DEMO ===
            {
              id: 'demo-dismissible',
              content: 'This announcement can be dismissed. Click the X to hide it!',
              variant: 'tip',
              dismissible: true,
              showOn: ['/demos/dismissible', '/demos/dismissible/**'],
            },
            {
              id: 'demo-non-dismissible',
              content: 'This announcement cannot be dismissed - no close button!',
              variant: 'danger',
              dismissible: false,
              showOn: ['/demos/dismissible', '/demos/dismissible/**'],
            },

            // === DISPLAY MODES DEMO ===
            {
              id: 'demo-stack-1',
              content: 'First stacked announcement (note variant)',
              variant: 'note',
              showOn: ['/demos/display-modes', '/demos/display-modes/**'],
            },
            {
              id: 'demo-stack-2',
              content: 'Second stacked announcement (tip variant)',
              variant: 'tip',
              showOn: ['/demos/display-modes', '/demos/display-modes/**'],
            },
            {
              id: 'demo-stack-3',
              content: 'Third stacked announcement (caution variant)',
              variant: 'caution',
              showOn: ['/demos/display-modes', '/demos/display-modes/**'],
            },

            // === SCHEDULING DEMO ===
            {
              id: 'demo-scheduling-active',
              content: 'This announcement is currently active (no date restrictions).',
              variant: 'tip',
              showOn: ['/demos/scheduling', '/demos/scheduling/**'],
            },
          ],
        }),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
        {
          label: 'Guides',
          items: [
            'guides/comparison',
            'guides/configuration',
            'guides/announcements',
            'guides/display-modes',
          ],
        },
        {
          label: 'Demos',
          autogenerate: {
            directory: 'demos/',
          },
        },
      ],
      social: [
        { href: 'https://github.com/frostybee/starlight-announcement', icon: 'github', label: 'GitHub' },
      ],
    }),
  ],
})
