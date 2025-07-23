# Word Test Enhancement Implementation Plan

## Overview
Enhance the existing word test feature with dynamic question generation from JSON library files, automatic audio pronunciation, and timer-based card management.

## Current State Analysis

### Existing Components
- **WordTest.jsx**: Main test page with timer wrapper and navigation protection
- **WordTestCardGallery.jsx**: Horizontal scrolling gallery with hardcoded 5-word array
- **WordTestWordCard.jsx**: Individual cards with spelling inputs, multiple choice, and placeholder audio button
- **TimerContext.jsx**: 3-minute countdown timer with color-coded progress

### Data Structure
- JSON library: `/public/Library/七年级上.json`
- Word format: `{word, phonetic, meaning, false_meanings[], unit, part_of_speech}`
- Current card format: `{id, word, inputs[], submitted, chineseMeanings[], selectedOption}`

## Implementation Plan

### Phase 1: Question Generation System
**Goal**: Replace hardcoded words with dynamic generation from JSON library

#### Tasks:
1. **Create Question Service** (`src/services/questionService.js`)
   - [ ] Load vocabulary data from JSON files
   - [ ] Implement shuffle algorithm for random word selection
   - [ ] Avoid repetition until all words are used
   - [ ] Generate question objects with correct + 3 false meanings in random positions

2. **Question Data Structure**
   ```javascript
   {
     id: string,
     word: string,
     phonetic: string,
     correctMeaning: string,
     options: [string, string, string, string], // Random order
     correctIndex: number,
     inputs: string[],
     submitted: boolean,
     selectedOption: string
   }
   ```

3. **Integration Points**
   - [ ] Update `WordTestCardGallery.jsx` to use question service
   - [ ] Modify card state management for dynamic data
   - [ ] Ensure proper cleanup and memory management

### Phase 2: Audio Pronunciation System
**Goal**: Implement automatic and manual audio playback using Browser Speech Synthesis API

#### Tasks:
1. **Create Audio Service** (`src/services/audioService.js`)
   - [ ] Wrapper for Speech Synthesis API
   - [ ] Configure voice settings (language: en-US, rate, pitch)
   - [ ] Error handling for unsupported browsers
   - [ ] Queue management for sequential playback

2. **Audio Integration**
   - [ ] Auto-play pronunciation when card becomes active
   - [ ] Manual replay via play button click
   - [ ] Visual feedback during playback
   - [ ] Handle edge cases (muted browser, no voices available)

3. **Implementation Details**
   ```javascript
   const speakWord = (word) => {
     const utterance = new SpeechSynthesisUtterance(word);
     utterance.lang = 'en-US';
     utterance.rate = 0.8;
     speechSynthesis.speak(utterance);
   };
   ```

### Phase 3: Timer-Based Card Management
**Goal**: Integrate timer with card generation and navigation logic

#### Tasks:
1. **Enhanced Timer Integration**
   - [ ] Card generation stops when timer expires
   - [ ] Last unfinished card disappears if not centered
   - [ ] Prevent navigation to new cards after timer ends

2. **State Management Updates**
   - [ ] Connect timer state to card gallery
   - [ ] Implement card visibility logic based on timer
   - [ ] Handle edge cases (user on last card when timer expires)

### Phase 4: Testing and Refinement
**Goal**: Ensure robust functionality across different scenarios

#### Tasks:
1. **Cross-browser Testing**
   - [ ] Test Speech Synthesis API on Chrome, Firefox, Safari
   - [ ] Verify Chinese pronunciation quality
   - [ ] Test mobile device compatibility

2. **Edge Case Handling**
   - [ ] Empty JSON library files
   - [ ] Network issues loading data
   - [ ] Browser without speech synthesis support
   - [ ] Timer ending at various card states

## Technical Decisions

### Audio Solution: Browser Speech Synthesis API
**Pros**: No setup, free, simple implementation
**Cons**: Quality varies by browser, potential Chinese pronunciation issues on Firefox
**Fallback**: Visual-only mode if speech synthesis unavailable

### Question Generation Strategy
- **Randomization**: Fisher-Yates shuffle algorithm
- **No Repetition**: Track used words until library exhausted
- **Multiple Choice**: Use provided false_meanings, randomize positions

### Timer Integration Approach
- **Auto-start**: Timer begins when page loads (future: user-initiated)
- **End Behavior**: Stop generating cards, fade last uncentered card
- **Future**: Results screen after timer completion

## File Structure Changes

### New Files
```
src/
├── services/
│   ├── questionService.js     # Question generation logic
│   └── audioService.js        # Speech synthesis wrapper
└── utils/
    └── shuffle.js             # Array randomization utility
```

### Modified Files
```
src/
├── components/
│   ├── WordTestCardGallery.jsx    # Use dynamic questions
│   ├── WordTestWordCard.jsx       # Integrate audio service
│   └── WordTestTimer.jsx          # Enhanced timer callbacks
├── contexts/
│   └── TimerContext.jsx           # Add timer end callbacks
└── pages/
    └── WordTest.jsx               # Future: start button integration
```

## Development Workflow

1. **Phase 1**: Implement and test question generation in isolation
2. **Phase 2**: Add audio functionality, test with existing hardcoded data
3. **Phase 3**: Integrate timer logic with new systems
4. **Phase 4**: End-to-end testing and refinement

## Future Enhancements (Post-Implementation)

- [ ] User-initiated timer start (replace auto-start)
- [ ] Results screen with performance metrics
- [ ] Multiple library file support
- [ ] Difficulty level selection
- [ ] Progress tracking and analytics
- [ ] Offline capability with service workers

## Success Criteria

✅ **Functional Requirements**
- Questions generate randomly from JSON library
- No word repetition until library exhausted
- Audio plays automatically and on demand
- Timer controls card generation lifecycle

✅ **Non-Functional Requirements**
- Works reliably in China
- Smooth user experience on mobile
- Graceful degradation if audio fails
- Memory efficient for long sessions

---

**Next Steps**: Begin Phase 1 implementation with question service creation.