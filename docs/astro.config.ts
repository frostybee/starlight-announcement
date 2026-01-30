import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightAnnouncement from 'starlight-announcement'
import starlightLinksValidator from 'starlight-links-validator'

export default defineConfig({
  base: '/starlight-announcement',
  site: 'https://frostybee.github.io/starlight-announcement/',
  integrations: [
    starlight({
      title: 'Starlight Announcement',
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      editLink: {
        baseUrl: 'https://github.com/frostybee/starlight-announcement/edit/main/docs/',
      },
      plugins: [
        starlightAnnouncement({
          displayMode: 'rotate',
          rotateInterval: 5000,
          announcements: [
            // Global welcome announcement (except demo pages) - Localized
            {
              id: 'welcome-announcement',
              content: {
                en: 'Welcome to starlight-announcement plugin!',
                fr: 'Bienvenue dans le plugin starlight-announcement !',
              },
              variant: 'tip',
              link: {
                text: {
                  en: 'Get Started',
                  fr: 'Commencer',
                },
                href: '/starlight-announcement/getting-started/',
              },
              hideOn: ['/demos/**', '/fr/demos/**'],
            },

            // === VARIANTS DEMO ===
            {
              id: 'demo-variant-note',
              content: {
                en: 'This is a <strong>note</strong> variant - great for general information.',
                fr: 'Ceci est une variante <strong>note</strong> - idéale pour les informations générales.',
              },
              variant: 'note',
              showOn: ['/demos/variants', '/demos/variants/**', '/fr/demos/variants', '/fr/demos/variants/**'],
            },
            {
              id: 'demo-variant-tip',
              content: {
                en: 'This is a <strong>tip</strong> variant - perfect for positive news!',
                fr: 'Ceci est une variante <strong>tip</strong> - parfaite pour les bonnes nouvelles !',
              },
              variant: 'tip',
              showOn: ['/demos/variants', '/demos/variants/**', '/fr/demos/variants', '/fr/demos/variants/**'],
            },
            {
              id: 'demo-variant-caution',
              content: {
                en: 'This is a <strong>caution</strong> variant - use for warnings.',
                fr: 'Ceci est une variante <strong>caution</strong> - à utiliser pour les avertissements.',
              },
              variant: 'caution',
              showOn: ['/demos/variants', '/demos/variants/**', '/fr/demos/variants', '/fr/demos/variants/**'],
            },
            {
              id: 'demo-variant-danger',
              content: {
                en: 'This is a <strong>danger</strong> variant - for critical alerts!',
                fr: 'Ceci est une variante <strong>danger</strong> - pour les alertes critiques !',
              },
              variant: 'danger',
              showOn: ['/demos/variants', '/demos/variants/**', '/fr/demos/variants', '/fr/demos/variants/**'],
            },

            // === LINKS DEMO ===
            {
              id: 'demo-internal-link',
              content: {
                en: 'New to the plugin? Check out our guide!',
                fr: 'Nouveau avec le plugin ? Consultez notre guide !',
              },
              variant: 'tip',
              link: {
                text: { en: 'Getting Started', fr: 'Commencer' },
                href: '/starlight-announcement/getting-started/',
              },
              showOn: ['/demos/links', '/demos/links/**', '/fr/demos/links', '/fr/demos/links/**'],
            },
            {
              id: 'demo-external-link',
              content: {
                en: 'Star us on GitHub if you find this useful!',
                fr: 'Mettez-nous une étoile sur GitHub si vous trouvez cela utile !',
              },
              variant: 'note',
              link: {
                text: { en: 'GitHub Repository', fr: 'Dépôt GitHub' },
                href: 'https://github.com/frostybee/starlight-announcement',
              },
              showOn: ['/demos/links', '/demos/links/**', '/fr/demos/links', '/fr/demos/links/**'],
            },
            {
              id: 'demo-no-link',
              content: {
                en: 'This announcement has no link - just informational text.',
                fr: 'Cette annonce n\'a pas de lien - juste du texte informatif.',
              },
              variant: 'caution',
              showOn: ['/demos/links', '/demos/links/**', '/fr/demos/links', '/fr/demos/links/**'],
            },

            // === DISMISSIBLE DEMO ===
            {
              id: 'demo-dismissible',
              content: {
                en: 'This announcement can be dismissed. Click the X to hide it!',
                fr: 'Cette annonce peut être fermée. Cliquez sur le X pour la masquer !',
              },
              variant: 'tip',
              dismissible: true,
              showOn: ['/demos/dismissible', '/demos/dismissible/**', '/fr/demos/dismissible', '/fr/demos/dismissible/**'],
            },
            {
              id: 'demo-non-dismissible',
              content: {
                en: 'This announcement cannot be dismissed - no close button!',
                fr: 'Cette annonce ne peut pas être fermée - pas de bouton de fermeture !',
              },
              variant: 'danger',
              dismissible: false,
              showOn: ['/demos/dismissible', '/demos/dismissible/**', '/fr/demos/dismissible', '/fr/demos/dismissible/**'],
            },

            // === DISPLAY MODES DEMO ===
            {
              id: 'demo-stack-1',
              content: {
                en: 'First stacked announcement (note variant)',
                fr: 'Première annonce empilée (variante note)',
              },
              variant: 'note',
              showOn: ['/demos/display-modes', '/demos/display-modes/**', '/fr/demos/display-modes', '/fr/demos/display-modes/**'],
            },
            {
              id: 'demo-stack-2',
              content: {
                en: 'Second stacked announcement (tip variant)',
                fr: 'Deuxième annonce empilée (variante tip)',
              },
              variant: 'tip',
              showOn: ['/demos/display-modes', '/demos/display-modes/**', '/fr/demos/display-modes', '/fr/demos/display-modes/**'],
            },
            {
              id: 'demo-stack-3',
              content: {
                en: 'Third stacked announcement (caution variant)',
                fr: 'Troisième annonce empilée (variante caution)',
              },
              variant: 'caution',
              showOn: ['/demos/display-modes', '/demos/display-modes/**', '/fr/demos/display-modes', '/fr/demos/display-modes/**'],
            },

            // === SCHEDULING DEMO ===
            {
              id: 'demo-scheduling-active',
              content: {
                en: 'This announcement is currently active (no date restrictions).',
                fr: 'Cette annonce est actuellement active (aucune restriction de date).',
              },
              variant: 'tip',
              showOn: ['/demos/scheduling', '/demos/scheduling/**', '/fr/demos/scheduling', '/fr/demos/scheduling/**'],
            },

            // === ROTATE MODE DEMO ===
            {
              id: 'demo-rotate-1',
              content: {
                en: 'First announcement - Watch the dots below!',
                fr: 'Première annonce - Regardez les points ci-dessous !',
              },
              variant: 'tip',
              showOn: ['/demos/rotate', '/demos/rotate/**', '/fr/demos/rotate', '/fr/demos/rotate/**'],
            },
            {
              id: 'demo-rotate-2',
              content: {
                en: 'Second announcement - Click a dot to jump here!',
                fr: 'Deuxième annonce - Cliquez sur un point pour y accéder !',
              },
              variant: 'note',
              showOn: ['/demos/rotate', '/demos/rotate/**', '/fr/demos/rotate', '/fr/demos/rotate/**'],
            },
            {
              id: 'demo-rotate-3',
              content: {
                en: 'Third announcement - Try keyboard navigation!',
                fr: 'Troisième annonce - Essayez la navigation au clavier !',
              },
              variant: 'caution',
              showOn: ['/demos/rotate', '/demos/rotate/**', '/fr/demos/rotate', '/fr/demos/rotate/**'],
            },
          ],
        }),
        starlightLinksValidator({
          errorOnFallbackPages: false,
          errorOnInconsistentLocale: true
        })
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
        {
          label: 'Guides',
          items: [
            'guides/configuration',
            'guides/comparison',
            'guides/announcements',
            'guides/display-modes',
            'guides/internationalization',
            'guides/custom-styling',
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
