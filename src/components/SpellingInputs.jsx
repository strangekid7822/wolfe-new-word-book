/**
 * Spelling input boxes - one input per letter
 * Features:
 * - Groups inputs by word for phrases (e.g., "Here you are" → [____] [___] [___])
 * - No gaps within word groups, gap-4 between groups
 * - Bottom border only, scales up 110% on focus
 * - Shows correct/wrong feedback with shadows and flip animation
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
  const words = cardData.word.split(' ');
  let letterIndex = 0;

  return (
    <div className="flex justify-center gap-4 mb-4">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex bg-gray-100">
          {word.split('').map(() => {
            const index = letterIndex++;
            const value = cardData.inputs[index];
            const { inputFeedback } = feedbackState;
            const isWrong = inputFeedback.wrongInputs.includes(index);
            const correctLetter = inputFeedback.correctLetters[index] || '';

            const inputFeedbackClass = getInputFeedbackClass(index);
            const inputFlipClass = feedbackState.showEffects && isWrong && feedbackState.effectPhase === 'permanent'
              ? 'card-flip-animation'
              : '';

            return (
              <div
                key={index}
                className={`w-4 h-10 sm:w-4 sm:h-9 border-b-2 border-gray-300 bg-gray-100 transition-transform duration-150 flex items-center justify-center focus-within:scale-110 focus-within:bg-white focus-within:border-[var(--color-secondary)] input-container ${inputFeedbackClass} ${inputFlipClass}`}
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
                  className="w-full h-full bg-transparent outline-none text-center text-xl appearance-none caret-[var(--color-secondary)]"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SpellingInputs;