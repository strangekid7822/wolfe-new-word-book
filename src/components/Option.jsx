import React, { useRef, useEffect, useState } from 'react';

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
  const textRef = useRef(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  // Force repaint when selection state changes (fixes iOS Safari rendering issue)
  useEffect(() => {
    if (buttonRef.current) {
      // Force a reflow by accessing offsetHeight
      const element = buttonRef.current;
      void element.offsetHeight;
      
      // Use requestAnimationFrame to ensure the repaint happens
      requestAnimationFrame(() => {
        // Hardware acceleration is now handled by CSS class
        void element.offsetHeight;
      });
    }
  }, [isSelected]);

  // Check if text overflows and needs marquee
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const element = textRef.current;
        setShouldMarquee(element.scrollWidth > element.clientWidth);
      }
    };

    checkOverflow();
    
    // Recheck on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

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
        option-button transform-gpu
        ${isSelected && !feedbackClass ? 'option-selected' : 'option-default'}
        ${disabled ? 'option-disabled' : ''}
        ${feedbackClass}
        ${flipAnimationClass}
      `}
    >
      <span className="option-label">{label}.</span>
      <span className="option-text" ref={textRef}>
        <span className={shouldMarquee ? 'marquee-text' : ''}>{text}</span>
      </span>
    </button>
  );
};

export default Option;