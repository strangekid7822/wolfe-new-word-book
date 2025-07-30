import React, { useRef, useEffect } from 'react';

/**
 * Option Component
 * Renders a clickable option for Chinese meaning selection with feedback effects
 * @param {object} props - Component props
 * @param {string} props.text - The Chinese meaning text to display
 * @param {string} props.label - The option label (A, B, C, D)
 * @param {boolean} props.isSelected - Whether this option is currently selected
 * @param {function} props.onClick - Function to call when option is clicked
 * @param {boolean} props.disabled - Whether the option should be disabled
 * @param {string} props.feedbackType - 'correct' | 'wrong' | null for answer feedback
 * @param {string} props.effectPhase - 'pulsing' | 'permanent' | null for animation state
 * @param {number} props.animationKey - Key to force re-render for animation restart
 */
const Option = ({ text, label, isSelected, onClick, disabled, feedbackType, effectPhase, animationKey }) => {
  const buttonRef = useRef(null);

  // Force repaint when selection state changes (fixes iOS Safari rendering issue)
  useEffect(() => {
    if (buttonRef.current) {
      // Force a reflow by accessing offsetHeight
      const element = buttonRef.current;
      void element.offsetHeight;
      
      // Use requestAnimationFrame to ensure the repaint happens
      requestAnimationFrame(() => {
        element.style.transform = element.style.transform || 'translateZ(0)';
      });
    }
  }, [isSelected]);

  // Generate feedback CSS class based on feedback state
  const getFeedbackClass = () => {
    if (!feedbackType || !effectPhase) return '';
    
    if (effectPhase === 'pulsing') {
      return feedbackType === 'correct' ? 'option-correct-pulse' : 'option-wrong-pulse';
    }
    
    if (effectPhase === 'permanent') {
      return feedbackType === 'correct' ? 'option-correct-shadow' : 'option-wrong-shadow';
    }
    
    return '';
  };

  const feedbackClass = getFeedbackClass();
  
  // Add flip animation class when feedback starts (both correct and wrong options)
  // Since we removed pulsing phase, trigger flip when feedback first appears
  const shouldShowFlipAnimation = feedbackType && effectPhase === 'permanent';
  const flipAnimationClass = shouldShowFlipAnimation ? 'card-flip-animation' : '';

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      key={animationKey} // Force re-render when animation restarts
      className={`
        option-button
        ${isSelected && !feedbackClass ? 'option-selected' : 'option-default'}
        ${disabled ? 'option-disabled' : ''}
        ${feedbackClass}
        ${flipAnimationClass}
      `}
    >
      <span className="option-label">{label}.</span>
      <span className="option-text">{text}</span>
    </button>
  );
};

export default Option;