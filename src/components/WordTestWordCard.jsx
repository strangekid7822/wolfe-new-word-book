import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';

const WordTestWordCard = forwardRef(({ cardData, isActive, onInputChange, onConfirm }, ref) => {
  const inputRefs = useRef([]);
  const pulseRef = useRef(null);

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
    // Restart animation by removing and re-adding class
    if (pulseRef.current) {
      pulseRef.current.classList.remove('animate');
      void pulseRef.current.offsetWidth; // Force reflow
      pulseRef.current.classList.add('animate');
    }
  };

  const areAllInputsFilled = cardData.inputs.every(input => input.trim() !== '');
  const isButtonDisabled = cardData.submitted || !areAllInputsFilled;

  return (
    <div className="word-card-style p-6 text-center w-full mx-auto min-h-[50vh] flex flex-col justify-between">
      <div className="play-button-wrapper" onClick={handlePlayButtonClick}>
        <div className="play-button-container">
          <div ref={pulseRef} className="play-button-pulse"></div>
          <div className="play-button-main shadow-[var(--shadow-play-button)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="play-button-svg">
              <polygon points="30,20 85,55 30,90" />
            </svg>
          </div>
        </div>
      </div>
      
      <p className="text-[var(--color-black)] text-lg font-light"><span className="animated-glow-wrapper">根据读音拼写单词:</span></p>
      
      <div className="flex justify-center gap-1">
        {cardData.inputs.map((value, index) => (
          // Input Wrapper: Handles all styling, including focus states, for cross-browser consistency.
          <div
            key={index}
            className="w-8 h-10 sm:w-7 sm:h-9 rounded-lg border border-gray-300 bg-gray-100 transition-transform duration-150 flex items-center justify-center focus-within:scale-110 focus-within:bg-white"
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
              className="w-full h-full bg-transparent outline-none text-center text-base font-medium appearance-none"
              style={{ color: cardData.submitted ? 'grey' : 'black' }}
            />
          </div>
        ))}
      </div>
      
      <div className={`btn-animated-wrapper ${isButtonDisabled ? 'border-transparent' : 'border-visible'}`}>
        <button 
          onClick={() => onConfirm(cardData.id)}
          disabled={isButtonDisabled}
          className={isButtonDisabled ? 'btn-disabled' : 'btn-animated'}
        >
          确定
        </button>
      </div>
    </div>
  );
});

export default WordTestWordCard;
