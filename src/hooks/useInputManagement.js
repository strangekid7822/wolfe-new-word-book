import { useRef, useImperativeHandle } from 'react';

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
    
    // Auto-unfocus when last input is filled (hide keyboard on mobile)
    if (value && index === cardData.word.length - 1) {
      setTimeout(() => {
        e.target.blur();
      }, 50);
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !cardData.inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle input click and text selection
  const handleInputClick = (e, index) => {
    const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");

    // If all inputs are filled, allow click and select text
    if (firstEmptyIndex === -1) {
      if (cardData.inputs[index]) {
        setTimeout(() => e.target.select(), 0);
      }
      return;
    }

    // If clicked input is beyond first empty, prevent click
    if (index > firstEmptyIndex) {
      e.preventDefault();
    } else if (cardData.inputs[index]) {
      // Select text for available filled inputs
      setTimeout(() => e.target.select(), 0);
    }
  };

  // Handle input focus for text selection
  const handleInputFocus = (e, index) => {
    if (cardData.inputs[index]) {
      e.target.select();
    }
  };

  return {
    inputRefs,
    validateInputs,
    handleInputChange,
    handleKeyDown,
    handleInputClick,
    handleInputFocus
  };
};