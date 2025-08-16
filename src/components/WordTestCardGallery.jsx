import { useState, useRef, useEffect, useCallback } from 'react';
import WordTestWordCard from './WordTestWordCard';
import ResultCard from './ResultCard';
import questionService from '../services/questionService';
import { useTimer } from '../contexts/TimerContext';

function WordTestCardGallery() {
  // Core state
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordCards, setWordCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [canGenerateCards, setCanGenerateCards] = useState(true);
  const [showResultCard, setShowResultCard] = useState(false);
  const [resultData, setResultData] = useState({ score: 0 });

  // Refs
  const containerRef = useRef(null);
  const cardComponentRefs = useRef([]);
  const cardElementRefs = useRef([]);
  
  // Timer context
  const { isTimeUp, setOnTimerEnd, resetTimer } = useTimer();

  // Initialize questions
  const initializeQuestions = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const success = await questionService.loadLibrary('七年级上.json');
      if (!success) throw new Error('Failed to load vocabulary library');
      
      const questions = questionService.generateQuestions(1);
      if (questions.length === 0) throw new Error('No questions could be generated');
      
      const initialCards = questions.map(q => ({ ...q, chineseMeanings: q.options }));
      setWordCards(initialCards);
    } catch (error) {
      console.error('Error initializing questions:', error);
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { initializeQuestions(); }, [initializeQuestions]);

  // Calculate final score: base points + speed bonuses + streak bonuses
  const calculateResults = useCallback(() => {
    const submittedCards = wordCards.filter(card => card.submitted);
    if (submittedCards.length === 0) return { score: 0 };

    let totalScore = 0;
    let currentStreak = 0;

    // Base scoring (50 spelling + 50 meaning per card) + streak bonuses
    submittedCards.forEach(card => {
      const spellingCorrect = card.inputs.join('').toLowerCase() === card.word.toLowerCase();
      const meaningCorrect = card.selectedOption === card.correctMeaning;
      
      if (spellingCorrect) totalScore += 50;
      if (meaningCorrect) totalScore += 50;

      // Ongoing streak bonuses: +25/50/75 per perfect card based on streak length
      if (spellingCorrect && meaningCorrect) {
        currentStreak++;
        if (currentStreak >= 10) totalScore += 75;
        else if (currentStreak >= 6) totalScore += 50;
        else if (currentStreak >= 3) totalScore += 25;
      } else {
        currentStreak = 0;
      }
    });

    // Speed bonuses: reward completing more cards
    const cardCount = submittedCards.length;
    if (cardCount >= 10) totalScore += 50;
    if (cardCount >= 15) totalScore += 100;
    if (cardCount >= 20) totalScore += 200;

    return { score: totalScore };
  }, [wordCards]);

  // Handle timer end
  useEffect(() => {
    const handleTimerEnd = () => {
      setCanGenerateCards(false);
      setWordCards(prev => prev.slice(0, activeIndex + 1)); // Keep only current card
      
      setTimeout(() => {
        const results = calculateResults();
        const submittedCount = wordCards.filter(card => card.submitted).length;
        console.log(`Game ended - Score: ${results.score}, Words answered: ${submittedCount}`);
        setResultData(results);
        setShowResultCard(true);
      }, 500);
    };

    setOnTimerEnd(() => handleTimerEnd);
    return () => setOnTimerEnd(null);
  }, [activeIndex, setOnTimerEnd, calculateResults]);

  // Generate new cards
  const generateNewCard = useCallback(() => {
    if (!canGenerateCards || isTimeUp) return null;
    const newQuestion = questionService.generateQuestion();
    return newQuestion ? { ...newQuestion, chineseMeanings: newQuestion.options } : null;
  }, [canGenerateCards, isTimeUp]);

  // Auto-generate preview cards
  useEffect(() => {
    if (canGenerateCards && !isTimeUp && wordCards.length > 0 && activeIndex >= wordCards.length - 1) {
      const newCard = generateNewCard();
      if (newCard) setWordCards(prev => [...prev, newCard]);
    }
  }, [activeIndex, wordCards.length, canGenerateCards, isTimeUp, generateNewCard]);

  // Keep refs in sync
  useEffect(() => {
    cardComponentRefs.current = cardComponentRefs.current.slice(0, wordCards.length);
    cardElementRefs.current = cardElementRefs.current.slice(0, wordCards.length);
  }, [wordCards]);

  // Scroll and focus management
  const scrollToCard = (index) => {
    cardElementRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      inline: 'center', 
      block: 'nearest' 
    });
  };

  useEffect(() => {
    if (showResultCard) return;
    scrollToCard(activeIndex);
    const timer = setTimeout(() => {
      cardComponentRefs.current[activeIndex]?.focus({ preventScroll: true });
    }, 350);
    return () => clearTimeout(timer);
  }, [activeIndex, showResultCard]);

  useEffect(() => {
    if (!showResultCard) setTimeout(() => scrollToCard(0), 100);
  }, [showResultCard]);

  // Event handlers
  const handleInputChange = (cardId, inputIndex, value) => {
    setWordCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, inputs: Object.assign([...card.inputs], { [inputIndex]: value }) }
        : card
    ));
  };

  const handleOptionSelect = (cardId, selectedMeaning) => {
    setWordCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, selectedOption: selectedMeaning } : card
    ));
  };

  const handleConfirm = (cardId) => {
    // Mark card as submitted
    setWordCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, submitted: true } : card
    ));
    
    // Log progress
    const submittedCount = wordCards.filter(card => card.submitted).length + 1;
    setTimeout(() => {
      const currentScore = calculateResults().score;
      console.log(`Word submitted - Total answered: ${submittedCount}, Score: ${currentScore}`);
    }, 10);

    const nextIndex = activeIndex + 1;

    // Generate new card if needed
    setWordCards(prev => {
      if (nextIndex >= prev.length - 1 && canGenerateCards && !isTimeUp) {
        const newCard = generateNewCard();
        if (newCard) return [...prev, newCard];
      }
      return prev;
    });

    // Move to next card after animation
    setTimeout(() => {
      if (nextIndex < wordCards.length) setActiveIndex(nextIndex);
    }, 100);
  };

  const handleTryAgain = () => {
    setShowResultCard(false);
    setResultData({ score: 0 });
    setActiveIndex(0);
    setCanGenerateCards(true);
    questionService.reset();
    initializeQuestions();
    resetTimer();
  };

  // Render states
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        Error: {loadError}
      </div>
    );
  }

  if (showResultCard) {
    return <ResultCard score={resultData.score} onTryAgain={handleTryAgain} />;
  }

  // Main gallery
  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 touch-scroll scroll-smooth"
      >
        <div className="flex-shrink-0 w-[7.5vw]" />
        {wordCards.map((card, index) => {
          const shouldShowCard = !isTimeUp || index <= activeIndex;
          return shouldShowCard ? (
            <div 
              key={card.id}
              ref={el => cardElementRefs.current[index] = el}
              className="flex-shrink-0 px-2 snap-center word-card-container w-[90vw]"
            >
              <WordTestWordCard 
                ref={el => cardComponentRefs.current[index] = el}
                cardData={card}
                isActive={index === activeIndex}
                onInputChange={handleInputChange}
                onConfirm={handleConfirm}
                onOptionSelect={handleOptionSelect}
              />
            </div>
          ) : null;
        })}
        <div className="flex-shrink-0 w-[7.5vw]" />
      </div>
    </div>
  );
}

export default WordTestCardGallery;
