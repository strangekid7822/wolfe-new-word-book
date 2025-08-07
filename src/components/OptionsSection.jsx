import Option from './Option';

/**
 * Component for rendering Chinese meaning options
 * Handles option selection and feedback display
 */
const OptionsSection = ({ 
  cardData, 
  feedbackState, 
  onOptionSelect, 
  getOptionFeedbackType 
}) => {
  return (
    <div className="space-y-1.5 mb-4">
      {/* Options section header - no layout-affecting animations */}
      <p className="text-[var(--color-black)] [--txt-body-lg]">选择中文意思:</p>
      
      {/* Options container - reserves full space immediately */}
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