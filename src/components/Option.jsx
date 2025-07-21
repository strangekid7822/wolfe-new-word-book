import React from 'react';

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
  return (
    <button
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