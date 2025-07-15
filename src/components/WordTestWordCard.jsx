import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

const WordTestWordCard = forwardRef(({ cardData, isActive, onInputChange, onConfirm }, ref) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, cardData.word.length);
  }, [cardData.word]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (cardData.submitted) return;
      const firstEmptyIndex = cardData.inputs.findIndex(input => input === "");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex].focus();
      }
    }
  }));

  const handleInputChange = (e, index) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
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

  const areAllInputsFilled = cardData.inputs.every(input => input.trim() !== '');
  const isButtonDisabled = cardData.submitted || !areAllInputsFilled;

  return (
    <div className="bg-[var(--color-white)] p-6 rounded-3xl shadow-lg text-center w-full mx-auto min-h-[50vh] flex flex-col justify-between">
      <img src="/WordTestWordCard_PlayButton_Secondary.svg" alt="Play" className="w-14 h-14 mx-auto cursor-pointer hover:scale-105 transition-transform drop-shadow-[var(--shadow-play-button)]" />
      
      <p className="text-[var(--color-black)] text-lg font-light">根据读音拼写单词:</p>
      
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
      
      <button 
        onClick={() => onConfirm(cardData.id)}
        disabled={isButtonDisabled}
        className={`px-8 py-2.5 rounded-full text-base font-medium transition-colors shadow-md mx-auto ${
          isButtonDisabled
            ? 'bg-gray-300 text-black cursor-not-allowed'
            : 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary-2)]'
        }`}
      >
        确定
      </button>
    </div>
  );
});

export default WordTestWordCard;
