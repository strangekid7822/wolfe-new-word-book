import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import SubmitButton from './SubmitButton';
import Option from './Option';

const WordTestWordCard = forwardRef(({ cardData, isActive, onInputChange, onConfirm, onOptionSelect }, ref) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, cardData.word.length);
  }, [cardData.word]);

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

  const handlePlayButtonClick = () => {
    // Handle audio play functionality here
    // The liquid glass effect handles visual feedback automatically
    console.log('Play button clicked for word:', cardData.word);
  };

  // Logic for determining when to show options and submit button
  const areAllInputsFilled = cardData.inputs.every(input => input.trim() !== '');
  const shouldShowOptions = areAllInputsFilled && !cardData.submitted;
  const shouldShowSubmitButton = areAllInputsFilled && cardData.selectedOption && !cardData.submitted;

  return (
    <div className="word-card-style p-6 text-center w-full mx-auto min-h-[50vh] flex flex-col justify-between">
      <div className="glass-effect glass-play-button rounded-[1.8rem]" onClick={handlePlayButtonClick}>
        <div className="glass-content">
          <svg className="glass-play-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      <p className="text-[var(--color-black)] text-lg font-light"><span>根据读音拼写单词:</span></p>
      
      <div className="flex justify-center gap-1">
        {cardData.inputs.map((value, index) => (
          // Input Wrapper: Handles all styling, including focus states, for cross-browser consistency.
          <div
            key={index}
            className="w-8 h-10 sm:w-7 sm:h-9 rounded-lg border-2 border-gray-300 bg-gray-100 transition-transform duration-150 flex items-center justify-center focus-within:scale-110 focus-within:bg-white focus-within:border-[var(--color-secondary)]"
          >
            <input
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              inputMode="latin"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseDown={(e) => handleInputClick(e, index)}
              disabled={cardData.submitted}
              className="w-full h-full bg-transparent outline-none text-center text-base font-medium appearance-none caret-[var(--color-secondary)]"
              style={{ color: cardData.submitted ? 'grey' : 'black' }}
            />
          </div>
        ))}
      </div>
      
      {/* Chinese Meaning Options - Show when all inputs are filled but not submitted */}
      {shouldShowOptions && (
        <div className="mt-6 space-y-4">
          <p className="text-[var(--color-black)] text-lg font-light">选择中文意思:</p>
          <div className="grid grid-cols-2 gap-3">
            {cardData.chineseMeanings.map((meaning, index) => (
              <Option
                key={index}
                text={meaning}
                label={String.fromCharCode(65 + index)} // A, B, C, D
                isSelected={cardData.selectedOption === meaning}
                onClick={() => onOptionSelect(cardData.id, meaning)}
                disabled={cardData.submitted}
              />
            ))}
          </div>
        </div>
      )}

      {/* Submit Button - Show only when inputs filled and option selected */}
      {shouldShowSubmitButton && (
        <div className="mt-6">
          <SubmitButton
            onClick={() => onConfirm(cardData.id)}
            isDisabled={false}
            buttonText="确定"
          />
        </div>
      )}
    </div>
  );
});

export default WordTestWordCard;
