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

This is a React-based word learning application built with Vite and styled with Tailwind CSS. The app helps Chinese students learn English through interactive spelling exercises.

### Key Components Structure

**Pages** (`src/pages/`):
- `WordTest.jsx` - Main testing interface combining timer, stats, and card gallery
- `Home.jsx` - Landing page
- `Profile.jsx` - User profile page

**Core Components** (`src/components/`):
- `WordTestCardGallery.jsx` - Horizontal scrolling gallery with snap-to-card behavior and touch gestures
- `WordTestWordCard.jsx` - Individual word card with character input boxes and audio play button
- `WordTestTimer.jsx` - Timer component for tracking session time
- `WordTestStats.jsx` - Statistics display component
- `Layout.jsx` - Main layout wrapper with navigation
- `WordTestNavBar.jsx` - Navigation bar component

**Context Providers** (`src/contexts/`):
- `TimerContext.jsx` - Centralized timer state management with 3-minute countdown functionality

### State Management
- Uses React Context for timer state (TimerContext) and React's built-in state (useState, useRef) for other components
- TimerContext manages 3-minute countdown with color-coded progress indicators
- Word cards contain: `{ id, word, inputs: [], submitted: boolean }`
- Gallery manages active card index and horizontal scrolling position

### Key Features
- **Mobile-First Design**: Optimized for touch interactions with horizontal card swiping
- **Character Input Logic**: Individual input boxes for each letter with auto-focus progression
- **Input Validation**: Only allows lowercase letters, auto-slices to single character
- **Scroll-to-Card**: Programmatic navigation between cards with smooth scrolling
- **Audio Integration**: Play button with pulse animation for word pronunciation

### Styling
- **Tailwind CSS 4.1.11** with Vite plugin integration
- **Custom CSS Variables**: Defined in `index.css` for colors and shadows
- **Responsive Design**: Uses viewport units (vw) for card sizing and spacing
- **Cross-browser Input Styling**: Custom wrapper divs for consistent focus states

### Navigation
- React Router DOM 7.6.3 with nested routes under Layout component
- Routes: `/` (Home), `/write` (WordTest), `/profile` (Profile)

### Build Configuration
- **Vite**: Fast development server and build tool
- **ESLint**: Code linting with React hooks and refresh plugins
- **Host Setting**: `host: true` in vite.config.js enables network access for mobile testing

### Input Handling Specifics
- Prevents clicking beyond the first empty input box
- Backspace navigation between input fields
- Auto-progression to next field on character input
- Disables all inputs when card is submitted