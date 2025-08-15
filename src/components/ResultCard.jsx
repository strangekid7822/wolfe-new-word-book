import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

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

  // Trigger confetti when component mounts
  useEffect(() => {
    const triggerConfetti = () => {
      // App theme colors
      const colors = ['#0080BB', '#87D9FF', '#CEEAF9', '#95FF87', '#FF7787', '#FFC800'];
      
      // Multiple bursts for celebration effect
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min, max) => Math.random() * (max - min) + min;
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }
        
        // Burst from center with varied spread
        confetti({
          particleCount: randomInRange(15, 30),
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.5, 0.7) },
          colors: colors,
          shapes: ['square', 'circle'],
          scalar: randomInRange(0.8, 1.2),
          gravity: randomInRange(0.6, 1.0),
          drift: randomInRange(-0.5, 0.5)
        });
        
        // Side bursts occasionally
        if (Math.random() < 0.3) {
          confetti({
            particleCount: randomInRange(10, 20),
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.6 },
            colors: colors
          });
          
          confetti({
            particleCount: randomInRange(10, 20),
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.6 },
            colors: colors
          });
        }
      }, 150);
    };
    
    // Start confetti after a brief delay for card animation
    const timer = setTimeout(triggerConfetti, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="result-card-container">
      <div className="result-card">
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
