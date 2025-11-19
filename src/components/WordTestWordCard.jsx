import { forwardRef, useEffect, useState } from 'react';
import SubmitButton from './SubmitButton';
import SpellingInputs from './SpellingInputs';
import AudioPlayButton from './AudioPlayButton';
import OptionsSection from './OptionsSection';
import { useInputManagement } from '../hooks/useInputManagement';
import { useFeedbackState } from '../hooks/useFeedbackState';
import { useAudioPlayback } from '../hooks/useAudioPlayback';

const WordTestWordCard = forwardRef(({ cardData, isActive, onInputChange, onConfirm, onOptionSelect }, ref) => {
  const [isExiting, setIsExiting] = useState(false);
  // Custom hooks for separated concerns
  const { inputRefs, validateInputs, handleInputChange, handleKeyDown, handleInputClick, handleInputFocus } = useInputManagement(cardData, onInputChange, ref);
  const { feedbackState, getInputFeedbackClass, getOptionFeedbackType } = useFeedbackState(cardData, validateInputs);
  const { isGlowing, handlePlayButtonClick } = useAudioPlayback(cardData.word, isActive, cardData.submitted);

  // Ensure input refs array matches word length
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, cardData.word.length);
  }, [cardData.word, inputRefs]);

  // Logic for determining when to show options and submit button
  const areAllInputsFilled = cardData.inputs.every(input => input.trim() !== '');
  const shouldShowOptions = areAllInputsFilled; // Show options when inputs are filled, even after submission
  const shouldShowSubmitButton = areAllInputsFilled && cardData.selectedOption && !cardData.submitted;

  return (
    <div className={`word-card-style px-6 py-4 text-center w-full mx-auto flex flex-col overflow-y-auto ${shouldShowOptions ? 'word-card-expanded' : ''}`}>
      {/* Audio Play Button */}
      <AudioPlayButton
        onPlayClick={handlePlayButtonClick}
        isGlowing={isGlowing}
      />

      {/* Chinese prompt */}
      {/* Chinese prompt */}
      <div className="mb-6">
        <p className="text-[var(--color-grey-darker)] text-xs font-bold tracking-wider uppercase mb-1 opacity-70">
          Challenge
        </p>
        <h3 className="text-[var(--color-primary)] text-xl font-bold tracking-tight">
          根据读音拼写单词
        </h3>
      </div>

      {/* Spelling Input Fields */}
      <SpellingInputs
        cardData={cardData}
        feedbackState={feedbackState}
        inputRefs={inputRefs}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        onInputFocus={handleInputFocus}
        getInputFeedbackClass={getInputFeedbackClass}
      />

      {/* Chinese meaning options */}
      {shouldShowOptions && (
        <OptionsSection
          cardData={cardData}
          feedbackState={feedbackState}
          onOptionSelect={onOptionSelect}
          getOptionFeedbackType={getOptionFeedbackType}
        />
      )}

      {/* Submit Button */}
      {shouldShowSubmitButton && (
        <div
          className={`submit-button-enter ${isExiting ? 'submit-button-exit' : ''}`}
          onAnimationEnd={(e) => {
            if (e.animationName === 'fadeOutScale') {
              onConfirm(cardData.id);
              setIsExiting(false);
            }
          }}
        >
          <SubmitButton
            onClick={() => {
              if (!isExiting && !cardData.submitted) {
                setIsExiting(true);
              }
            }}
            isDisabled={cardData.submitted || isExiting}
            buttonText="确定"
          />
        </div>
      )}
    </div>
  );
});

export default WordTestWordCard;
