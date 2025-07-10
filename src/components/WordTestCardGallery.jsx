import { useState, useRef, useEffect } from 'react';
import WordTestWordCard from './WordTestWordCard';

function WordTestCardGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  // Sample data - replace with actual word data
  const cards = [
    { id: 1, word: "hello", length: 5 },
    { id: 2, word: "world", length: 5 },
    { id: 3, word: "react", length: 5 },
    { id: 4, word: "coding", length: 6 },
    { id: 5, word: "swift", length: 5 },
  ];

  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || isTransitioning) return;
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    
    // Apply transform during drag
    if (containerRef.current) {
      const baseTransform = -activeIndex * 100;
      const dragOffset = (deltaX / window.innerWidth) * 100;
      containerRef.current.style.transform = `translateX(${baseTransform + dragOffset}vw)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || isTransitioning) return;
    isDragging.current = false;
    
    const deltaX = currentX.current - startX.current;
    const threshold = window.innerWidth * 0.2; // 20% of screen width
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && activeIndex > 0) {
        // Swipe right - go to previous card
        setActiveIndex(activeIndex - 1);
      } else if (deltaX < 0 && activeIndex < cards.length - 1) {
        // Swipe left - go to next card
        setActiveIndex(activeIndex + 1);
      }
    }
    
    // Reset transform and trigger transition
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Mouse events for desktop
  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    isDragging.current = true;
    startX.current = e.clientX;
    currentX.current = startX.current;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isTransitioning) return;
    currentX.current = e.clientX;
    const deltaX = currentX.current - startX.current;
    
    if (containerRef.current) {
      const baseTransform = -activeIndex * 100;
      const dragOffset = (deltaX / window.innerWidth) * 100;
      containerRef.current.style.transform = `translateX(${baseTransform + dragOffset}vw)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current || isTransitioning) return;
    isDragging.current = false;
    
    const deltaX = currentX.current - startX.current;
    const threshold = window.innerWidth * 0.2;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (deltaX < 0 && activeIndex < cards.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    // Update transform when activeIndex changes
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${activeIndex * 100}vw)`;
    }
  }, [activeIndex]);

  useEffect(() => {
    // Add mouse event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeIndex, isTransitioning]);

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={containerRef}
        className={`flex transition-transform ${isTransitioning ? 'duration-300 ease-out' : 'duration-0'}`}
        style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {cards.map((card, index) => (
          <div key={card.id} className="w-full flex-shrink-0 px-4">
            <WordTestWordCard 
              isActive={index === activeIndex}
              wordLength={card.length}
              cardData={card}
            />
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, index) => (
          <div
            key={index}
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
