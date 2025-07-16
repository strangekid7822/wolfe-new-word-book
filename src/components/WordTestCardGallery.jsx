import { useState, useRef, useEffect } from 'react';
import WordTestWordCard from './WordTestWordCard';

function WordTestCardGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const [wordCards, setWordCards] = useState([
    { id: 1, word: "hello", inputs: ["", "", "", "", ""], submitted: false },
    { id: 2, word: "world", inputs: ["", "", "", "", ""], submitted: false },
    { id: 3, word: "react", inputs: ["", "", "", "", ""], submitted: false },
    { id: 4, word: "coding", inputs: ["", "", "", "", "", ""], submitted: false },
    { id: 5, word: "swift", inputs: ["", "", "", "", ""], submitted: false },
  ]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, wordCards.length);
  }, [wordCards]);

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (cardRefs.current[activeIndex]) {
        cardRefs.current[activeIndex].focus();
      }
    }, 100);

    return () => clearTimeout(focusTimeout);
  }, [activeIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth * 0.85;
    
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < wordCards.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToCard = (index) => {
    if (!containerRef.current || index < 0 || index >= wordCards.length) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth * 0.85;
    const scrollPosition = index * cardWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
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
      setTimeout(() => scrollToCard(nextIndex), 300);
    }
  };

  useEffect(() => {
    scrollToCard(0);
  }, []);

  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pt-2 pb-12"
        onScroll={handleScroll}
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
            className="flex-shrink-0 px-2 snap-center" 
            style={{ width: '85vw' }}
          >
            <WordTestWordCard 
              ref={el => cardRefs.current[index] = el}
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
