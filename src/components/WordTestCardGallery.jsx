import { useState, useRef, useEffect, useCallback } from 'react';
import WordTestWordCard from './WordTestWordCard';
import ResultCard from './ResultCard'; // Import the new ResultCard component
import questionService from '../services/questionService';
import { useTimer } from '../contexts/TimerContext';

function WordTestCardGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardComponentRefs = useRef([]);
  const cardElementRefs = useRef([]);
  const [wordCards, setWordCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [canGenerateCards, setCanGenerateCards] = useState(true);
  const { isTimeUp, setOnTimerEnd, resetTimer } = useTimer();

  // State for result card
  const [showResultCard, setShowResultCard] = useState(false);
  const [resultData, setResultData] = useState({ score: 0 });

  const initializeQuestions = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const success = await questionService.loadLibrary('七年级上.json');
      if (!success) throw new Error('Failed to load vocabulary library');
      const questions = questionService.generateQuestions(5);
      if (questions.length === 0) throw new Error('No questions could be generated');
      const initialCards = questions.map(q => ({ 
        ...q, 
        chineseMeanings: q.options 
      }));
      setWordCards(initialCards);
    } catch (error) {
      console.error('Error initializing questions:', error);
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeQuestions();
  }, [initializeQuestions]);

  const calculateResults = useCallback(() => {
    const submittedCards = wordCards.filter(card => card.submitted);
    if (submittedCards.length === 0) {
      return { score: 0 };
    }

    let totalScore = 0;
    submittedCards.forEach(card => {
      const spellingCorrect = card.inputs.join('').toLowerCase() === card.word.toLowerCase();
      const meaningCorrect = card.selectedOption === card.correctMeaning;
      let cardScore = 0;
      if (spellingCorrect) cardScore += 50;
      if (meaningCorrect) cardScore += 50;
      totalScore += cardScore;
    });

    const averageScore = Math.round(totalScore / submittedCards.length);
    return { score: averageScore };
  }, [wordCards]);

  useEffect(() => {
    const handleTimerEnd = () => {
      console.log('Timer ended - stopping card generation');
      setCanGenerateCards(false);

      setTimeout(() => {
        const results = calculateResults();
        setResultData(results);
        setShowResultCard(true);
      }, 500); // Delay for final animations

      setWordCards(prevCards => {
        if (prevCards.length > 0 && activeIndex < prevCards.length - 1) {
          return prevCards.slice(0, activeIndex + 1);
        }
        return prevCards;
      });
    };

    setOnTimerEnd(() => handleTimerEnd);

    return () => {
      setOnTimerEnd(null);
    };
  }, [activeIndex, setOnTimerEnd, calculateResults]);

  const generateNewCard = useCallback(() => {
    if (!canGenerateCards || isTimeUp) return null;
    const newQuestion = questionService.generateQuestion();
    return newQuestion ? { 
      ...newQuestion, 
      chineseMeanings: newQuestion.options 
    } : null;
  }, [canGenerateCards, isTimeUp]);

  useEffect(() => {
    if (canGenerateCards && !isTimeUp && wordCards.length > 0) {
      if (activeIndex >= wordCards.length - 1) {
        const newCard = generateNewCard();
        if (newCard) {
          setWordCards(prevCards => [...prevCards, newCard]);
        }
      }
    }
  }, [activeIndex, wordCards.length, canGenerateCards, isTimeUp, generateNewCard]);

  useEffect(() => {
    cardComponentRefs.current = cardComponentRefs.current.slice(0, wordCards.length);
    cardElementRefs.current = cardElementRefs.current.slice(0, wordCards.length);
  }, [wordCards]);

  const scrollToCard = (index) => {
    const cardElement = cardElementRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  useEffect(() => {
    if (showResultCard) return;
    scrollToCard(activeIndex);
    const focusTimeout = setTimeout(() => {
      if (cardComponentRefs.current[activeIndex]) {
        cardComponentRefs.current[activeIndex].focus({ preventScroll: true });
      }
    }, 350);
    return () => clearTimeout(focusTimeout);
  }, [activeIndex, showResultCard]);

  useEffect(() => {
    if (showResultCard) return;
    setTimeout(() => scrollToCard(0), 100);
  }, [showResultCard]);

  const handleInputChange = (cardId, inputIndex, value) => {
    setWordCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, inputs: Object.assign([...card.inputs], { [inputIndex]: value }) } : card
      )
    );
  };

  const handleOptionSelect = (cardId, selectedMeaning) => {
    setWordCards(prevCards =>
      prevCards.map(card => (card.id === cardId ? { ...card, selectedOption: selectedMeaning } : card))
    );
  };

  const handleConfirm = (cardId) => {
    setWordCards(prevCards =>
      prevCards.map(card => (card.id === cardId ? { ...card, submitted: true } : card))
    );

    const nextIndex = activeIndex + 1;

    setWordCards(prevCards => {
      if (nextIndex >= prevCards.length - 1 && canGenerateCards && !isTimeUp) {
        const newCard = generateNewCard();
        if (newCard) return [...prevCards, newCard];
      }
      return prevCards;
    });

    setTimeout(() => {
      if (nextIndex < wordCards.length) {
        setActiveIndex(nextIndex);
      }
    }, 2500);
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

  if (isLoading) {
    return <div className="w-full h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  if (loadError) {
    return <div className="w-full h-96 flex items-center justify-center text-red-500">Error: {loadError}</div>;
  }

  if (showResultCard) {
    return <ResultCard score={resultData.score} onTryAgain={handleTryAgain} />;
  }

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
