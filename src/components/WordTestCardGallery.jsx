import { useState, useRef, useEffect } from 'react';
import WordTestWordCard from './WordTestWordCard';

function WordTestCardGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const cards = [
    { id: 1, word: "hello", length: 5 },
    { id: 2, word: "world", length: 5 },
    { id: 3, word: "react", length: 5 },
    { id: 4, word: "coding", length: 6 },
    { id: 5, word: "swift", length: 5 },
  ];

  // Update active index based on scroll position
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth * 0.85;
    
    // Calculate which card is closest to center
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < cards.length) {
      setActiveIndex(newIndex);
    }
  };

  // Scroll to specific card
  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth * 0.85;
    const scrollPosition = index * cardWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Initialize scroll position
  useEffect(() => {
    scrollToCard(0);
  }, []);

  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        onScroll={handleScroll}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Add padding divs to center first and last cards */}
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
        
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className="flex-shrink-0 px-2 snap-center" 
            style={{ width: '85vw' }}
          >
            <WordTestWordCard 
              isActive={index === activeIndex}
              wordLength={card.length}
              cardData={card}
            />
          </div>
        ))}
        
        {/* Add padding div at the end */}
        <div className="flex-shrink-0" style={{ width: '7.5vw' }} />
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex 
                ? 'bg-[var(--color-primary)]' 
                : 'bg-[var(--color-grey)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default WordTestCardGallery;
