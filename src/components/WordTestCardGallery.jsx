import { useState, useRef, useEffect } from 'react';
import WordTestWordCard from './WordTestWordCard';

function WordTestCardGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardComponentRefs = useRef([]); // For calling focus() on the component
  const cardElementRefs = useRef([]); // For scrolling to the DOM element

  const [wordCards, setWordCards] = useState([
    { id: 1, word: "hello", inputs: ["", "", "", "", ""], submitted: false },
    { id: 2, word: "world", inputs: ["", "", "", "", ""], submitted: false },
    { id: 3, word: "react", inputs: ["", "", "", "", ""], submitted: false },
    { id: 4, word: "coding", inputs: ["", "", "", "", "", ""], submitted: false },
    { id: 5, word: "swift", inputs: ["", "", "", "", ""], submitted: false },
  ]);

  useEffect(() => {
    cardComponentRefs.current = cardComponentRefs.current.slice(0, wordCards.length);
    cardElementRefs.current = cardElementRefs.current.slice(0, wordCards.length);
  }, [wordCards]);

  useEffect(() => {
    scrollToCard(activeIndex);
    const focusTimeout = setTimeout(() => {
      if (cardComponentRefs.current[activeIndex]) {
        // Focus on the input without causing a scroll jump
        cardComponentRefs.current[activeIndex].focus({ preventScroll: true });
      }
    }, 350); // A bit longer to allow for scroll animation

    return () => clearTimeout(focusTimeout);
  }, [activeIndex]);

  const scrollToCard = (index) => {
    const cardElement = cardElementRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

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

  const handleConfirm = (cardId) => {
    setWordCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, submitted: true } : card
      )
    );
    const nextIndex = activeIndex + 1;
    if (nextIndex < wordCards.length) {
      setActiveIndex(nextIndex);
    }
  };

  useEffect(() => {
    // Initial scroll can be slightly delayed to ensure layout is stable
    setTimeout(() => scrollToCard(0), 100);
  }, []);

  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pt-2 pb-12"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
        
        {wordCards.map((card, index) => (
          <div 
            key={card.id}
            ref={el => cardElementRefs.current[index] = el}
            className="flex-shrink-0 px-2 snap-center word-card-container" 
            style={{ width: '85vw' }}
          >
            <WordTestWordCard 
              ref={el => cardComponentRefs.current[index] = el}
              cardData={card}
              isActive={index === activeIndex}
              onInputChange={handleInputChange}
              onConfirm={handleConfirm}
            />
          </div>
        ))}
        
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
      </div>
    </div>
  );
}

export default WordTestCardGallery;
