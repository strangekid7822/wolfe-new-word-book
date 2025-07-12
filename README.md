# Wolfe Word Book

A modern Chinese word learning app built with React, Vite, and Tailwind CSS v4.1. Features an interactive swipeable card gallery for word spelling practice.

## Features

- 🎯 **Interactive Word Gallery** - Swipeable card interface with edge previews
- 📝 **Character Input System** - Individual character boxes with inner shadows
- 🎵 **Audio Playback** - Play button for word pronunciation
- 🎨 **Modern UI Design** - Clean interface with custom theme colors
- 📱 **Mobile-First** - Optimized for touch interactions and mobile screens
- ⚡ **High Performance** - Built with Tailwind CSS v4.1 (100x faster builds)
- 🎭 **Smooth Animations** - Gallery transitions and interactive feedback

## Tech Stack

- **React 18.2.0** - UI framework with hooks
- **Vite 5.2.0** - Build tool and dev server with network access
- **Tailwind CSS 4.1** - CSS framework with @theme configuration
- **Node.js 24.3.0** - Runtime environment

## Project Structure

```
src/
├── components/
│   ├── WordTestCardGallery.jsx  # Swipeable card gallery with touch/mouse events
│   ├── WordTestWordCard.jsx     # Individual word card with conditional rendering
│   ├── WordTestTimer.jsx        # Progress indicator bar
│   └── WordTestNavBar.jsx       # Bottom navigation with SVG icons
├── pages/
│   └── WordTest.jsx            # Main test page layout
├── assets/
└── index.css                   # Theme configuration and global styles

public/
├── WordTestNavBar_*.svg        # Navigation icons
└── WordTestWordCard_*.svg      # Play button icons
```

## Components

- **WordTestCardGallery** - Swipeable gallery with 85% card width, edge previews, and boundary spring-back
- **WordTestWordCard** - Conditional content rendering, responsive character inputs with inner shadows
- **WordTestTimer** - Horizontal progress bar with primary/grey theme colors
- **WordTestNavBar** - SVG icon navigation with secondary color background

## Custom Theme

```css
@theme {
  --color-primary: #0080BB;      /* Blue - primary actions, progress */
  --color-secondary: #87D9FF;    /* Light blue - buttons, navigation */
  --color-secondary-2: #CEEAF9;  /* Lighter blue - hover states */
  --color-tertiary: #F3FBFF;     /* Very light blue - backgrounds, inputs */
  --color-grey: #D9D9D9;         /* Grey - borders, inactive states */
  --color-black: #000000;        /* Text */
  --color-white: #FFFFFF;        /* Card backgrounds */
  --color-orange: #FF5900;       /* Accent color */
  --color-orange-yellow: #FFC800; /* Secondary accent */
}
```

## Gallery Features

- **Touch/Mouse Support** - Works on both mobile and desktop
- **Edge Visibility** - Shows previews of adjacent cards
- **Snap Positioning** - Cards snap to center position
- **Boundary Handling** - Spring-back animation at first/last cards
- **Progress Indicators** - Dot navigation at bottom
- **Conditional Rendering** - Only active cards render interactive content

## Development

```bash
# Install dependencies
npm install

# Start dev server (with network access)
npm run dev

# Access from mobile device
# Use the Network URL shown in terminal
```

## Mobile Development

The app includes network access configuration for testing on mobile devices:

```js
// vite.config.js
server: {
  host: true  // Enables network access
}
```

## Browser Support

**Mobile-first design** requires modern browsers:
- Safari 16.4+ (iOS)
- Chrome 111+ (Android/iOS)
- Firefox 128+

## Design System

- **Typography** - Responsive text sizing for mobile
- **Shadows** - Inner shadows on inputs, drop shadows on cards
- **Animations** - Smooth transitions and hover effects
- **Touch Targets** - Optimized for finger interaction
- **Edge Cases** - Boundary handling and spring-back animations
