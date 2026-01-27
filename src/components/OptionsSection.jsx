import Option from './Option';

/**
 * Chinese meaning options with A/B/C/D labels
 * Handles selection and correct/wrong feedback
 */
const OptionsSection = ({
  cardData,
  feedbackState,
  onOptionSelect,
  getOptionFeedbackType
}) => {
  return (
    <div className="space-y-1.5 mb-4">
      <p className="text-[var(--color-black)] text-xl">选择中文意思:</p>

      <div className="grid grid-cols-1 gap-1">
        {cardData.chineseMeanings.map((meaning, index) => {
          const feedbackType = getOptionFeedbackType(index);
          
          return (
            <div 
              key={index}
              className={`option-stagger-enter option-stagger-${index}`}
            >
              <Option
                text={meaning}
                label={String.fromCharCode(65 + index)}
                isSelected={cardData.selectedOption === meaning}
                onClick={() => onOptionSelect(cardData.id, meaning)}
                disabled={cardData.submitted}
                feedbackType={feedbackType}
                effectPhase={feedbackState.effectPhase}
                animationKey={feedbackState.animationKey}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsSection;