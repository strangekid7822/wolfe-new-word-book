import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultCard = ({ score, onTryAgain }) => {
  const navigate = useNavigate();

  const getPerformance = (score) => {
    if (score >= 80) return { level: 'Excellent!', color: 'text-green-400' };
    if (score >= 60) return { level: 'Good Job!', color: 'text-blue-400' };
    return { level: 'Keep Practicing!', color: 'text-orange-400' };
  };

  const performance = getPerformance(score);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="result-card-container">
      <div className="result-card">
        <div className="confetti-container">
          {[...Array(100)].map((_, i) => <div key={i} className={`confetti-${i}`}></div>)}
        </div>
        <h2 className="result-title">Time's Up!</h2>
        <p className="result-subtitle">Here's your performance:</p>
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-label">Score</span>
        </div>
        <p className={`performance-level ${performance.color}`}>{performance.level}</p>
        <div className="result-actions">
          <button onClick={onTryAgain} className="result-button try-again">Try Again</button>
          <button onClick={handleGoHome} className="result-button go-home">Go Home</button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
