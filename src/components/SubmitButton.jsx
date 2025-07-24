import React from 'react';

const SubmitButton = ({ onClick, isDisabled, buttonText }) => {
  return (
    <>
      {isDisabled ? (
        <div className="btn-submit-disabled-wrapper">
          <button
            onClick={onClick}
            disabled={isDisabled}
            className="btn-submit-disabled"
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="btn-submit-wrapper">
          <button
            onClick={onClick}
            className="btn-submit"
          >
            {buttonText}
          </button>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
