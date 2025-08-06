/**
 * Component for rendering spelling input fields with validation feedback
 * Handles individual letter inputs with animations and feedback states
 */
const SpellingInputs = ({ 
  cardData, 
  feedbackState, 
  inputRefs, 
  onInputChange, 
  onKeyDown, 
  onInputClick,
  onInputFocus,
  getInputFeedbackClass 
}) => {
  return (
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
              onChange={(e) => onInputChange(e, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              onMouseDown={(e) => onInputClick(e, index)}
              onFocus={(e) => onInputFocus(e, index)}
              disabled={cardData.submitted}
              className="w-full h-full bg-transparent outline-none text-center [--txt-body] appearance-none caret-[var(--color-secondary)]"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SpellingInputs;