import { useRef, useImperativeHandle, useEffect } from 'react';

/**
 * Custom hook for managing spelling input fields and navigation
 * Handles input validation, navigation between fields, and focus management
 */
export const useInputManagement = (cardData, onInputChange, ref) => {
  const inputRefs = useRef([]);

  // Expose focus method through ref
  useImperativeHandle(ref, () => ({
    focus: (options) => {
      if (cardData.submitted) return;
      const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus(options);
      }
    }
  }));

  // Dismiss keyboard automatically when all inputs are filled
  useEffect(() => {
    const allFilled = cardData.inputs.every(input => input !== '');
    if (allFilled) {
      const lastInput = inputRefs.current[cardData.inputs.length - 1];
      if (lastInput) {
        lastInput.blur();
      }
    }
  }, [cardData.inputs]);

  // Input validation helper
  const validateInputs = (userInputs, correctWord) => {
    const correctLetters = correctWord.toLowerCase().split('');
    const wrongIndices = [];
    const correctIndices = [];
    
    userInputs.forEach((input, index) => {
      if (input.toLowerCase() === correctLetters[index]) {
        correctIndices.push(index);
      } else {
        wrongIndices.push(index);
      }
    });
    
    return { wrongIndices, correctIndices, correctLetters };
  };

  // Handle input change with validation and auto-navigation
  const handleInputChange = (e, index) => {
    let value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    // Force single character
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    onInputChange(cardData.id, index, value);

    // Auto-navigate to next input
    if (value && index < cardData.word.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !cardData.inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Prevent clicking on inputs beyond the first empty one
  const handleInputClick = (e, index) => {
    const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");

    // If all inputs are filled, allow the click
    if (firstEmptyIndex === -1) {
      return;
    }

    // If the clicked input is beyond the first empty one, prevent the click
    if (index > firstEmptyIndex) {
      e.preventDefault();
    }
  };

  return {
    inputRefs,
    validateInputs,
    handleInputChange,
    handleKeyDown,
    handleInputClick
  };
};