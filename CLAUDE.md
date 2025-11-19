# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Style
- Be concise and direct in all responses
- Use short explanations unless detailed context is needed
- Prioritize brevity over verbose explanations

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
- `WordTestCardGallery.jsx` - Horizontal scrolling gallery with snap-to-card behavior, dynamic question generation, and infinite card flow controlled by timer
- `WordTestWordCard.jsx` - Individual word card with expandable sections: audio play button with automatic pronunciation, spelling inputs, Chinese meaning options, and submit button
- `WordTestTimer.jsx` - 3-minute countdown timer with color-coded progress bar and digital display
- `Layout.jsx` - Main layout wrapper with navigation bar and consistent styling
- `WordTestNavBar.jsx` - Bottom navigation bar with active state icons and navigation protection
- `SubmitButton.jsx` - Animated submit button with colorful rotating border animation
- `Option.jsx` - Multiple choice option buttons for Chinese meaning selection with glassmorphism effects

**Context Providers** (`src/contexts/`):
- `TimerContext.jsx` - Centralized 3-minute countdown timer with accurate time tracking, color-coded states, formatted display, and callback system for timer expiration events

**Services** (`src/services/`):
- `questionService.js` - Dynamic question generation from JSON vocabulary libraries with randomization, no-repetition logic, and multiple choice option shuffling
- `audioService.js` - Browser Speech Synthesis API wrapper for English pronunciation with voice selection and error handling

**Utilities** (`src/utils/`):
- `shuffle.js` - Fisher-Yates shuffle algorithm implementation for array randomization

### State Management
- **React Context**: Timer state managed through TimerContext with 180-second countdown
- **Local State**: Component-specific state using useState and useRef
- **Question Data Structure**: 
  ```javascript
  {
    id: string,
    word: string,
    phonetic: string,
    correctMeaning: string,
    options: string[], // Shuffled array with correct + false meanings
    correctIndex: number,
    inputs: string[],
    submitted: boolean,
    selectedOption: string
  }
  ```
- **Vocabulary Library Structure**: JSON files with textbook vocabularies including word, phonetic, meaning, false_meanings, unit, and part_of_speech
- **Gallery State**: Active card index, scroll position, and component references for focus management

### Key Features
- **Dynamic Question Generation**: Random word selection from JSON vocabulary libraries with no repetition until all words are used
- **Automatic Audio Pronunciation**: Words play automatically when cards become active, using Browser Speech Synthesis API with English voice selection
- **Manual Audio Replay**: Glassmorphism-styled play button with visual feedback animations for replaying pronunciation
- **Expandable Word Cards**: Cards grow vertically to show Chinese meaning options after spelling completion
- **Smart Input Navigation**: Sequential input filling with auto-focus, backspace navigation, click prevention beyond first empty input, and automatic keyboard dismissal when last input is filled
- **Text Selection for Input Replacement**: Automatic text selection when clicking or focusing filled inputs, enabling easy letter replacement without manual deletion
- **Randomized Multiple Choice**: Chinese meaning options with shuffled positions to prevent pattern learning
- **Infinite Card Flow**: Cards generate continuously while timer runs, with visual preview hints of upcoming cards
- **Timer-Controlled Gameplay**: 3-minute countdown controls card generation, stopping new cards and hiding uncentered cards when time expires
- **Navigation Protection**: Warns users before leaving the word test if they have entered answers
- **Mobile-Optimized Scrolling**: Horizontal card gallery with snap-to-center behavior and touch-friendly interactions
- **Cross-Browser Audio Support**: Works in Chrome, Firefox, and Safari with graceful degradation for unsupported browsers

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
- **Vocabulary Libraries**: JSON files in `public/Library/` (e.g., `七年级上.json`) containing structured textbook vocabularies
- **Word Structure**: Each word entry includes word, phonetic notation, Chinese meaning, array of false meanings, unit classification, and part of speech
- **Dynamic Loading**: Asynchronous loading of vocabulary data with error handling and loading states
- **Question Generation**: Real-time conversion of vocabulary data into interactive question objects with shuffled multiple choice options

### Performance Optimizations
- **Ref Management**: Separate refs for component instances and DOM elements for efficient focus/scroll operations
- **Animation Performance**: CSS transforms and transitions optimized for mobile devices
- **Scroll Performance**: Hardware-accelerated scrolling with `WebkitOverflowScrolling: touch`
- **Memory Management**: Proper cleanup of timers, event listeners, and audio synthesis utterances
- **Efficient Randomization**: Fisher-Yates shuffle algorithm for optimal randomization performance
- **Question Caching**: Smart question generation that avoids repetition while maintaining randomness
- **Audio Optimization**: Speech synthesis with voice caching and error recovery for consistent performance