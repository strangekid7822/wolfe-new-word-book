import React from 'react';

const SubmitButton = ({ onClick, isDisabled, buttonText }) => {
  return (
    <>
      {isDisabled ? (
        <button
          onClick={onClick}
          disabled={isDisabled}
          className="btn-disabled"
        >
          {buttonText}
        </button>
      ) : (
        <div className="btn-animated-wrapper">
          <button
            onClick={onClick}
            className="btn-animated"
          >
            {buttonText}
          </button>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
