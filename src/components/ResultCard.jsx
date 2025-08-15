import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ResultCard = ({ score, onTryAgain }) => {
  const navigate = useNavigate();

  const getPerformance = (score) => {
    if (score >= 1000) return { level: '牛波一啊！', color: 'text-green-400' };
    if (score >= 500) return { level: '也就那么回事儿吧！', color: 'text-blue-400' };
    return { level: '你跟我扯犊子呢？', color: 'text-orange-400' };
  };

  const performance = getPerformance(score);

  const handleGoHome = () => navigate('/');

  // App theme colors
  const THEME_COLORS = ['#0080BB', '#87D9FF', '#CEEAF9', '#95FF87', '#FF7787', '#FFC800'];
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  // Confetti celebration effect
  useEffect(() => {
    const startConfetti = () => {
      const duration = 3000;
      const endTime = Date.now() + duration;
      
      const interval = setInterval(() => {
        if (Date.now() >= endTime) {
          clearInterval(interval);
          return;
        }
        
        // Main center burst
        confetti({
          particleCount: randomInRange(15, 30),
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.5, 0.7) },
          colors: THEME_COLORS,
          shapes: ['square', 'circle'],
          scalar: randomInRange(0.8, 1.2),
          gravity: randomInRange(0.6, 1.0),
          drift: randomInRange(-0.5, 0.5)
        });
        
        // Occasional side bursts
        if (Math.random() < 0.3) {
          confetti({
            particleCount: randomInRange(10, 20),
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.6 },
            colors: THEME_COLORS
          });
          
          confetti({
            particleCount: randomInRange(10, 20),
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.6 },
            colors: THEME_COLORS
          });
        }
      }, 150);
    };
    
    const timer = setTimeout(startConfetti, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="result-card-container">
      <div className="result-card">
        <h2 className="result-title">时间到</h2>
        <p className="result-subtitle">看看你做的好事！</p>
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-label">得分</span>
        </div>
        <p className={`performance-level ${performance.color}`}>{performance.level}</p>
        <div className="result-actions">
          <button onClick={onTryAgain} className="result-button try-again">重来</button>
          <button onClick={handleGoHome} className="result-button go-home">回家</button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
