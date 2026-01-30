<div align="center">
  <h1>Starlight Announcement</h1>
  <p>Add custom announcement banners to your Starlight docs with scheduling, theming, and i18n support.</p>

  [![npm version](https://badge.fury.io/js/starlight-announcement.svg)](https://badge.fury.io/js/starlight-announcement)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## Features

- Display announcement banners at the top of your documentation,
- Schedule announcements with start and end dates,
- Multiple display modes: static, closable, and rotating,
- Fully customizable theming with built-in and custom styles,
- Internationalization (i18n) support for localized content,
- Accessible components with proper ARIA attributes,
- Works seamlessly with Starlight's existing configuration.

## Installation

Install the plugin using your preferred package manager:

```bash
npm install starlight-announcement
```

## Quick Start

```js
// astro.config.mjs
import starlight from '@astrojs/starlight';
import starlightAnnouncement from 'starlight-announcement';

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightAnnouncement({
          announcements: [
            {
              content: 'Welcome to our documentation!',
            },
          ],
        }),
      ],
    }),
  ],
});
```

## Documentation

For comprehensive documentation, installation guides, configuration options, and examples, visit the [plugin documentation](https://frostybee.github.io/starlight-announcement/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

Licensed under the MIT License, Copyright © frostybee.

See [LICENSE](/LICENSE) for more information.

## Links

- [GitHub Repository](https://github.com/frostybee/starlight-announcement)
- [npm Package](https://www.npmjs.com/package/starlight-announcement)
- [Documentation](https://frostybee.github.io/starlight-announcement/)
- [Issues](https://github.com/frostybee/starlight-announcement/issues)
