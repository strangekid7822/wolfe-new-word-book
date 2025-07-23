// Import necessary hooks from React.
import { useState, useRef, useEffect } from 'react';
// Import the child component that displays each word card.
import WordTestWordCard from './WordTestWordCard';
// Import the question service for dynamic question generation.
import questionService from '../services/questionService';

// This component manages the gallery of word cards, handling scrolling, and state.
function WordTestCardGallery() {
  // --- STATE MANAGEMENT ---
  // activeIndex: Keeps track of which card is currently centered and active.
  const [activeIndex, setActiveIndex] = useState(0);
  // containerRef: A reference to the main scrolling container div.
  const containerRef = useRef(null);
  // We use two separate refs for the cards:
  // 1. cardComponentRefs: Holds references to the WordTestWordCard component instances.
  //    This allows us to call component methods, like `focus()`.
  const cardComponentRefs = useRef([]);
  // 2. cardElementRefs: Holds references to the actual DOM elements of the cards.
  //    This is used for scrolling operations, like `scrollIntoView()`.
  const cardElementRefs = useRef([]);

  // wordCards: An array of objects, where each object represents a card's state.
  // Now dynamically generated from the question service instead of hardcoded.
  const [wordCards, setWordCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // --- EFFECTS ---
  // Initialize the question service and load the first set of questions.
  useEffect(() => {
    const initializeQuestions = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        // Load the vocabulary library
        const success = await questionService.loadLibrary('七年级上.json');
        if (!success) {
          throw new Error('Failed to load vocabulary library');
        }
        
        // Generate initial set of questions
        const questions = questionService.generateQuestions(5);
        if (questions.length === 0) {
          throw new Error('No questions could be generated from the library');
        }
        
        // Convert questions to the expected wordCards format
        const initialCards = questions.map(question => ({
          id: question.id,
          word: question.word,
          inputs: question.inputs,
          submitted: question.submitted,
          chineseMeanings: question.options, // These are already shuffled
          selectedOption: question.selectedOption,
          // Store additional data for future use
          phonetic: question.phonetic,
          correctMeaning: question.correctMeaning,
          correctIndex: question.correctIndex
        }));
        
        setWordCards(initialCards);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing questions:', error);
        setLoadError(error.message);
        setIsLoading(false);
      }
    };
    
    initializeQuestions();
  }, []);

  // This effect ensures our refs arrays are always the correct size, matching the number of cards.
  // This is important if the list of cards were to change dynamically.
  useEffect(() => {
    cardComponentRefs.current = cardComponentRefs.current.slice(0, wordCards.length);
    cardElementRefs.current = cardElementRefs.current.slice(0, wordCards.length);
  }, [wordCards]);

  // This is the core effect for handling card transitions.
  // It runs automatically whenever `activeIndex` changes.
  useEffect(() => {
    // 1. Scroll the new active card to the center of the view.
    scrollToCard(activeIndex);
    
    // 2. Set a timeout to focus the card's input *after* the scroll animation finishes.
    const focusTimeout = setTimeout(() => {
      if (cardComponentRefs.current[activeIndex]) {
        // Call the `focus` method on the WordTestWordCard component instance.
        // `preventScroll: true` is the key to fixing the "jumping" issue. It tells the
        // browser to focus the element without scrolling to it, as we've already handled the scroll.
        cardComponentRefs.current[activeIndex].focus({ preventScroll: true });
      }
    }, 350); // The delay must be long enough for the 'smooth' scroll animation to complete.

    // Cleanup: Cancel the timeout if the component unmounts or activeIndex changes again.
    return () => clearTimeout(focusTimeout);
  }, [activeIndex]);
  
  // This effect runs only once when the component first mounts.
  useEffect(() => {
    // A small delay ensures the layout is fully calculated before we attempt the initial scroll.
    setTimeout(() => scrollToCard(0), 100);
  }, []);


  // --- HANDLER FUNCTIONS ---
  // This function scrolls a specific card into the center of the view.
  const scrollToCard = (index) => {
    const cardElement = cardElementRefs.current[index];
    if (cardElement) {
      // `scrollIntoView` is a reliable, built-in browser API for scrolling.
      cardElement.scrollIntoView({
        behavior: 'smooth', // Creates a smooth scrolling animation.
        inline: 'center',   // Horizontally aligns the element to the center of the container.
        block: 'nearest'    // Vertically aligns the element without unnecessary scrolling.
      });
    }
  };

  // This function is called by a child card whenever an input value changes.
  const handleInputChange = (cardId, inputIndex, value) => {
    setWordCards(prevCards =>
      prevCards.map(card => {
        if (card.id === cardId) {
          const newInputs = [...card.inputs];
          newInputs[inputIndex] = value;
          return { ...card, inputs: newInputs };
        }
        return card;
      })
    );
  };

  // This function is called when the user selects a Chinese meaning option.
  const handleOptionSelect = (cardId, selectedMeaning) => {
    setWordCards(prevCards =>
      prevCards.map(card => {
        if (card.id === cardId) {
          return { ...card, selectedOption: selectedMeaning };
        }
        return card;
      })
    );
  };

  // This function is called when the user clicks the "Confirm" button on a card.
  const handleConfirm = (cardId) => {
    // First, update the state of the confirmed card to `submitted: true`.
    setWordCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, submitted: true } : card
      )
    );
    // Then, calculate the index of the next card.
    const nextIndex = activeIndex + 1;
    // If there is a next card, update the `activeIndex`.
    // This state change will trigger the `useEffect` hook to scroll and focus the new card.
    if (nextIndex < wordCards.length) {
      setActiveIndex(nextIndex);
    }
  };

  // --- JSX RENDERING ---
  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vocabulary...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (loadError) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-2">Failed to load vocabulary</p>
          <p className="text-gray-500 text-sm">{loadError}</p>
        </div>
      </div>
    );
  }
  
  // Show empty state
  if (wordCards.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">📚</div>
          <p className="text-gray-600">No vocabulary words available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* The main scrollable container for the card gallery. */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pt-2 pb-12"
        style={{
          scrollSnapType: 'x mandatory', // Enforces snapping to cards on scroll.
          WebkitOverflowScrolling: 'touch', // Enables smooth scrolling on iOS.
          scrollbarWidth: 'none', // Hides the scrollbar in Firefox.
          msOverflowStyle: 'none' // Hides the scrollbar in Internet Explorer.
        }}
      >
        {/* This spacer div provides padding on the left side of the first card. */}
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
        
        {/* Map over the `wordCards` array to render each card. */}
        {wordCards.map((card, index) => (
          <div 
            key={card.id}
            // Assign the ref for the card's outer DOM element.
            ref={el => cardElementRefs.current[index] = el}
            className="flex-shrink-0 px-2 snap-center word-card-container" 
            style={{ width: '85vw' }}
          >
            <WordTestWordCard 
              // Assign the ref for the WordTestWordCard component instance.
              ref={el => cardComponentRefs.current[index] = el}
              cardData={card}
              isActive={index === activeIndex}
              onInputChange={handleInputChange}
              onConfirm={handleConfirm}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        ))}
        
        {/* This spacer div provides padding on the right side of the last card. */}
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
      </div>
    </div>
  );
}

export default WordTestCardGallery;
