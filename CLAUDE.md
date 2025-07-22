# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Vite (includes hot reload and host: true for mobile testing)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Installation
- `npm install` - Install all dependencies

## Architecture

This is a React-based word learning application built with Vite and styled with Tailwind CSS. The app helps Chinese students learn English through interactive spelling and meaning selection exercises.

### Key Components Structure

**Pages** (`src/pages/`):
- `WordTest.jsx` - Main testing interface with timer and card gallery, includes navigation protection and beforeunload handling
- `Home.jsx` - Simple landing page (placeholder)
- `Profile.jsx` - User profile page (placeholder)

**Core Components** (`src/components/`):
- `WordTestCardGallery.jsx` - Horizontal scrolling gallery with snap-to-card behavior, touch gestures, and programmatic card transitions
- `WordTestWordCard.jsx` - Individual word card with expandable sections: audio play button, spelling inputs, Chinese meaning options, and submit button
- `WordTestTimer.jsx` - 3-minute countdown timer with color-coded progress bar and digital display
- `Layout.jsx` - Main layout wrapper with navigation bar and consistent styling
- `WordTestNavBar.jsx` - Bottom navigation bar with active state icons and navigation protection
- `SubmitButton.jsx` - Animated submit button with colorful rotating border animation
- `Option.jsx` - Multiple choice option buttons for Chinese meaning selection with glassmorphism effects

**Context Providers** (`src/contexts/`):
- `TimerContext.jsx` - Centralized 3-minute countdown timer with accurate time tracking, color-coded states, and formatted display

### State Management
- **React Context**: Timer state managed through TimerContext with 180-second countdown
- **Local State**: Component-specific state using useState and useRef
- **Word Card Data Structure**: 
  ```javascript
  {
    id: number,
    word: string,
    inputs: string[],
    submitted: boolean,
    chineseMeanings: string[],
    selectedOption: string
  }
  ```
- **Gallery State**: Active card index, scroll position, and component references for focus management

### Key Features
- **Expandable Word Cards**: Cards grow vertically to show Chinese meaning options after spelling completion
- **Smart Input Navigation**: Sequential input filling with auto-focus, backspace navigation, and click prevention beyond first empty input
- **Audio Play Button**: Glassmorphism-styled play button with visual feedback animations
- **Chinese Meaning Selection**: Multiple choice options with A/B/C/D labels and selection highlighting
- **Navigation Protection**: Warns users before leaving the word test if they have entered answers
- **Mobile-Optimized Scrolling**: Horizontal card gallery with snap-to-center behavior and touch-friendly interactions
- **Timer Integration**: 3-minute countdown with color transitions (blue > orange-yellow > orange) based on remaining time
- **Programmatic Card Transitions**: Automatic scrolling and focus management when moving between cards

### Styling System
- **Tailwind CSS 4.1.11** with modern `@theme` syntax in `index.css`
- **Neumorphism Design**: Consistent shadow and border styling across all components
- **Custom CSS Variables**: Comprehensive color palette and shadow definitions
- **Advanced Animations**:
  - Rotating conic gradient borders for submit buttons
  - Glassmorphism effects with semi-transparent backgrounds
  - Smooth card expansion animations with `slideInUp` keyframes
  - Glowing line animation for timer bar
  - CSS scroll-driven animations with fallbacks for older browsers
- **Cross-Browser Compatibility**: Special handling for iOS Safari rendering issues and mobile touch interactions

### Navigation & Routing
- **React Router DOM 7.6.3** with nested routes
- **Layout Pattern**: All routes wrapped in Layout component with consistent navigation
- **Routes**: 
  - `/` - Home page
  - `/write` - Word test interface
  - `/profile` - User profile
- **Active State Management**: Navigation icons change based on current route
- **User Experience**: Confirmation dialogs prevent accidental navigation away from active tests

### Build Configuration & Dependencies
- **Vite 5.2.0**: Fast development server and build tool
- **React 18.2.0**: Core framework with modern hooks and concurrent features
- **Tailwind CSS 4.1.11**: Utility-first styling with Vite plugin integration
- **ESLint 8.57.0**: Code quality and consistency checking
- **Mobile Development**: `host: true` setting enables network access for mobile device testing

### Data Integration
- **Vocabulary Data**: JSON files in `public/Library/` (e.g., `七年级上.json`) containing structured word data with phonetics, meanings, and units
- **Word Structure**: Each word entry includes unit classification, phonetic notation, part of speech, and Chinese meaning

### Performance Optimizations
- **Ref Management**: Separate refs for component instances and DOM elements for efficient focus/scroll operations
- **Animation Performance**: CSS transforms and transitions optimized for mobile devices
- **Scroll Performance**: Hardware-accelerated scrolling with `WebkitOverflowScrolling: touch`
- **Memory Management**: Proper cleanup of timers and event listeners