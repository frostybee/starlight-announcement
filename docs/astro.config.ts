import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightAnnouncement from 'starlight-announcement'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/frostybee/starlight-announcement/edit/main/docs/',
      },
      plugins: [starlightAnnouncement()],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
      ],
      social: [
        { href: 'https://github.com/frostybee/starlight-announcement', icon: 'github', label: 'GitHub' },
      ],
      title: 'starlight-announcement',
    }),
  ],
})
