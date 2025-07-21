import React, { useRef, useEffect } from 'react';

/**
 * Option Component
 * Renders a clickable option for Chinese meaning selection
 * @param {object} props - Component props
 * @param {string} props.text - The Chinese meaning text to display
 * @param {string} props.label - The option label (A, B, C, D)
 * @param {boolean} props.isSelected - Whether this option is currently selected
 * @param {function} props.onClick - Function to call when option is clicked
 * @param {boolean} props.disabled - Whether the option should be disabled
 */
const Option = ({ text, label, isSelected, onClick, disabled }) => {
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

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`
        option-button
        ${isSelected ? 'option-selected' : 'option-default'}
        ${disabled ? 'option-disabled' : ''}
      `}
    >
      <span className="option-label">{label}.</span>
      <span className="option-text">{text}</span>
    </button>
  );
};

export default Option;