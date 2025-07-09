# Wolfe's Word Book

A modern word book application built with React, Vite, and Tailwind CSS v4.1.

## Tech Stack

- **React 18.2.0** - UI framework
- **Vite 5.2.0** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Node.js 24.3.0** - Runtime environment

## Features

- ✨ Tailwind CSS v4.1 with text shadows
- 🎨 Colored drop shadows and masking utilities
- ⚡ 100x faster incremental builds with Oxide engine
- 🔧 Zero-configuration setup
- 📱 Responsive design

## Setup Process

### Initial Setup
1. Created React + Vite project template
2. Encountered Node.js compatibility issues with v18.17.0
3. Upgraded Node.js from v18.17.0 to v24.3.0 using Homebrew
4. Switched from Tailwind v3.4 to v4.1

### Node.js Upgrade
```bash
# Upgraded via Homebrew
brew upgrade node
# v18.17.0 → v24.3.0
```

### Dependencies
```bash
npm install
```

Key packages:
- `@tailwindcss/vite@4.1.11` - First-party Vite plugin
- `react@^18.2.0` - Stable React version
- `vite@^5.2.0` - Compatible with Node.js 24.x

## Development

### Start Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Configuration

### Tailwind CSS v4.1
- Uses new `@import "tailwindcss"` syntax
- CSS-first configuration with `@theme` blocks
- No separate config files needed
- Automatic content detection

### Custom Theme
```css
@theme {
  --color-primary: #646cff;
  --color-primary-hover: #535bf2;
}
```

## Project Structure

```
src/
├── App.jsx          # Main app component
├── index.css        # Tailwind imports and theme
└── main.jsx         # React entry point
```

## Browser Support

Tailwind CSS v4.1 requires modern browsers:
- Safari 16.4+
- Chrome 111+
- Firefox 128+

## Issues Resolved

1. **Node.js Compatibility**: Upgraded from v18.17.0 to v24.3.0
2. **Vite Version Conflicts**: Used compatible Vite 5.2.0
3. **Tailwind Migration**: Moved from v3.4 to v4.1 syntax
4. **ES Module Config**: Updated PostCSS config for ES modules

## New Features (v4.1)

- `text-shadow-*` utilities
- `mask-*` utilities for CSS masking
- Colored drop shadows (`drop-shadow-indigo-500`)
- Enhanced browser compatibility
- Performance optimizations

---

Built with ❤️ using the latest web technologies.
