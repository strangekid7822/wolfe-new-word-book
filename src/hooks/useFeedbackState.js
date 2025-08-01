import { useState, useEffect } from 'react';

/**
 * Custom hook for managing feedback state and visual effects
 * Handles both input feedback and option feedback after submission
 */
export const useFeedbackState = (cardData, validateInputs) => {
  const [feedbackState, setFeedbackState] = useState({
    showEffects: false,
    correctIndex: null,
    selectedIndex: null,
    effectPhase: null,
    animationKey: 0,
    inputFeedback: {
      showInputEffects: false,
      correctLetters: [],
      wrongInputs: [],
      correctInputs: [],
      inputAnimationKey: 0
    }
  });

  // Initialize feedback when card is submitted
  useEffect(() => {
    if (cardData.submitted && !feedbackState.showEffects) {
      const correctIndex = cardData.correctIndex;
      const selectedIndex = cardData.chineseMeanings.indexOf(cardData.selectedOption);
      const inputValidation = validateInputs(cardData.inputs, cardData.word);
      
      setFeedbackState({
        showEffects: true,
        correctIndex: correctIndex,
        selectedIndex: selectedIndex,
        effectPhase: 'permanent', // Skip pulsing, go straight to permanent
        animationKey: Date.now(),
        inputFeedback: {
          showInputEffects: false, // Skip input animations
          correctLetters: inputValidation.correctLetters,
          wrongInputs: inputValidation.wrongIndices,
          correctInputs: inputValidation.correctIndices,
          inputAnimationKey: Date.now()
        }
      });
    }
  }, [cardData.submitted, feedbackState.showEffects, cardData.correctIndex, cardData.chineseMeanings, cardData.selectedOption, cardData.inputs, cardData.word, validateInputs]);

  // Helper function to get input feedback CSS class
  const getInputFeedbackClass = (index) => {
    const { inputFeedback, effectPhase } = feedbackState;
    if (!inputFeedback.showInputEffects && effectPhase !== 'permanent') return '';
    
    const isCorrect = inputFeedback.correctInputs.includes(index);
    const isWrong = inputFeedback.wrongInputs.includes(index);
    
    if (effectPhase === 'pulsing') {
      if (isCorrect) return 'input-correct-pulse';
      if (isWrong) return 'input-wrong-pulse';
    } else if (effectPhase === 'permanent') {
      if (isCorrect) return 'input-correct-shadow';
      if (isWrong) return 'input-wrong-shadow';
    }
    
    return '';
  };

  // Get feedback type for options
  const getOptionFeedbackType = (index) => {
    if (!feedbackState.showEffects) return null;
    
    if (index === feedbackState.correctIndex) {
      return 'correct';
    } else if (index === feedbackState.selectedIndex && feedbackState.selectedIndex !== feedbackState.correctIndex) {
      return 'wrong';
    }
    
    return null;
  };

  return {
    feedbackState,
    getInputFeedbackClass,
    getOptionFeedbackType
  };
};