# Wolfe Word Book

A modern Chinese word learning app built with React, Vite, and Tailwind CSS v4.1.

## Features

- 🎯 Interactive word spelling tests with audio playback
- 🎨 Clean UI with custom theme colors and inner shadows
- ⚡ Built with Tailwind CSS v4.1 (100x faster builds)
- 📱 Responsive design optimized for learning

## Tech Stack

- **React 18.2.0** - UI framework
- **Vite 5.2.0** - Build tool and dev server  
- **Tailwind CSS 4.1** - CSS framework with @theme configuration
- **Node.js 24.3.0** - Runtime environment

## Components

- **WordTestTimer** - Progress indicator with theme colors
- **WordTestWordCard** - Main learning interface with character inputs
- **WordTestNavBar** - Navigation with SVG icons

## Custom Theme

```css
@theme {
  --color-primary: #0080BB;
  --color-secondary: #87D9FF;
  --color-secondary-2: #CEEAF9;
  --color-tertiary: #F3FBFF;
  --color-grey: #D9D9D9;
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-orange: #FF5900;
  --color-orange-yellow: #FFC800;
}
```

## Development

```bash
npm install
npm run dev
```

## Browser Support

Modern browsers only (Safari 16.4+, Chrome 111+, Firefox 128+)
