import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import SubmitButton from './SubmitButton';
import Option from './Option';
import audioService from '../services/audioService';

const WordTestWordCard = forwardRef(({ cardData, isActive, onInputChange, onConfirm, onOptionSelect }, ref) => {
  const inputRefs = useRef([]);
  const [feedbackState, setFeedbackState] = useState({
    showEffects: false,
    correctIndex: null,
    selectedIndex: null,
    effectPhase: null,
    animationKey: 0,
    // Input feedback state
    inputFeedback: {
      showInputEffects: false,
      correctLetters: [],
      wrongInputs: [],
      correctInputs: [],
      inputAnimationKey: 0
    }
  });

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, cardData.word.length);
  }, [cardData.word]);

  // Input validation helper function
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
        // Input feedback initialization
        inputFeedback: {
          showInputEffects: false, // Skip input animations
          correctLetters: inputValidation.correctLetters,
          wrongInputs: inputValidation.wrongIndices,
          correctInputs: inputValidation.correctIndices,
          inputAnimationKey: Date.now()
        }
      });
    }
  }, [cardData.submitted, feedbackState.showEffects, cardData.correctIndex, cardData.chineseMeanings, cardData.selectedOption, cardData.inputs, cardData.word]);

  // Auto-play pronunciation when card becomes active
  useEffect(() => {
    if (isActive && !cardData.submitted) {
      // Small delay to ensure smooth transition
      const playTimeout = setTimeout(async () => {
        try {
          await audioService.speakWord(cardData.word);
        } catch (error) {
          console.error('Error auto-playing audio:', error);
        }
      }, 500);
      
      return () => clearTimeout(playTimeout);
    }
  }, [isActive, cardData.word, cardData.submitted]);

  useImperativeHandle(ref, () => ({
    focus: (options) => {
      if (cardData.submitted) return;
      const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex].focus(options);
      }
    }
  }));

  const handleInputChange = (e, index) => {
    let value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    // Force single character
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    onInputChange(cardData.id, index, value);

    if (value && index < cardData.word.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !cardData.inputs[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputClick = (e, index) => {
    // Find the index of the first input that is empty.
    const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");

    // If all inputs are filled, allow the click (the component logic will handle disabled state).
    if (firstEmptyIndex === -1) {
      return;
    }

    // If the clicked input is beyond the first empty one, prevent the click.
    // This allows the user to click on any previously filled input or the single next empty one.
    if (index > firstEmptyIndex) {
      e.preventDefault();
    }
  };

  const [isGlowing, setIsGlowing] = useState(false);

  const handlePlayButtonClick = async () => {
    // Play the word pronunciation
    console.log('Playing pronunciation for word:', cardData.word);
    
    // Trigger the glow animation
    setIsGlowing(true);
    
    try {
      await audioService.speakWord(cardData.word);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
    
    // End glow animation after audio or timeout
    setTimeout(() => {
      setIsGlowing(false);
    }, 1500);
  };

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

  // Logic for determining when to show options and submit button
  const areAllInputsFilled = cardData.inputs.every(input => input.trim() !== '');
  const shouldShowOptions = areAllInputsFilled; // Show options when inputs are filled, even after submission
  const shouldShowSubmitButton = areAllInputsFilled && cardData.selectedOption && !cardData.submitted;

  return (
    <div className={`word-card-style px-6 py-4 text-center w-full mx-auto flex flex-col overflow-y-auto ${shouldShowOptions ? 'word-card-expanded' : ''}`}>
      {/* Play button */}
      <div className="glass-effect glass-play-button rounded-full mb-4" onClick={handlePlayButtonClick}>
        <div className="glass-content">
          <svg className="glass-play-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Chinese prompt */}
      <p className="text-[var(--color-black)] [--txt-body-lg] mb-1.5">
        <span>根据读音拼写单词:</span>
      </p>
      
      {/* Input fields */}
      <div className="flex justify-center gap-1 mb-4">
        {cardData.inputs.map((value, index) => {
          const { inputFeedback } = feedbackState;
          const isWrong = inputFeedback.wrongInputs.includes(index);
          const correctLetter = inputFeedback.correctLetters[index] || '';
          const inputFeedbackClass = getInputFeedbackClass(index);
          
          // Add flip animation for wrong inputs when feedback is shown
          const shouldShowInputFlip = feedbackState.showEffects && isWrong && feedbackState.effectPhase === 'permanent';
          const inputFlipClass = shouldShowInputFlip ? 'card-flip-animation' : '';
          
          return (
            <div
              key={index}
              className={`w-8 h-10 sm:w-7 sm:h-9 rounded-lg border-2 border-gray-300 bg-gray-100 transition-transform duration-150 flex items-center justify-center focus-within:scale-110 focus-within:bg-white focus-within:border-[var(--color-secondary)] input-container ${inputFeedbackClass} ${inputFlipClass}`}
            >
              <input
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                inputMode="latin"
                value={feedbackState.effectPhase === 'permanent' && isWrong ? correctLetter : value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseDown={(e) => handleInputClick(e, index)}
                disabled={cardData.submitted}
                className="w-full h-full bg-transparent outline-none text-center [--txt-body] appearance-none caret-[var(--color-secondary)]"
              />
            </div>
          );
        })}
      </div>
      
      {/* Chinese meaning options - always render when inputs are filled */}
      {shouldShowOptions && (
        <div className="space-y-1.5 submit-button-enter mb-4">
          <p className="text-[var(--color-black)] [--txt-body-lg]">选择中文意思:</p>
          <div className="grid grid-cols-1 gap-1">
            {cardData.chineseMeanings.map((meaning, index) => {
              // Determine feedback type for this option
              let feedbackType = null;
              if (feedbackState.showEffects) {
                if (index === feedbackState.correctIndex) {
                  feedbackType = 'correct';
                } else if (index === feedbackState.selectedIndex && feedbackState.selectedIndex !== feedbackState.correctIndex) {
                  feedbackType = 'wrong';
                }
              }
              
              return (
                <Option
                  key={index}
                  text={meaning}
                  label={String.fromCharCode(65 + index)}
                  isSelected={cardData.selectedOption === meaning}
                  onClick={() => onOptionSelect(cardData.id, meaning)}
                  disabled={cardData.submitted}
                  feedbackType={feedbackType}
                  effectPhase={feedbackState.effectPhase}
                  animationKey={feedbackState.animationKey}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button - always render when an option is selected or after submission */}
      {(areAllInputsFilled && cardData.selectedOption) && (
        <div className="submit-button-enter">
          <SubmitButton
            onClick={() => onConfirm(cardData.id)}
            isDisabled={cardData.submitted}
            buttonText="确定"
          />
        </div>
      )}
    </div>
  );
});

export default WordTestWordCard;
