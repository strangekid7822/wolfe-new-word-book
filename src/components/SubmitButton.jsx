import React from 'react';

const SubmitButton = ({ onClick, isDisabled, buttonText }) => {
  return (
    <div className={`btn-animated-wrapper ${isDisabled ? 'border-transparent' : 'border-visible'}`}>
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={isDisabled ? 'btn-disabled' : 'btn-animated'}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SubmitButton;
