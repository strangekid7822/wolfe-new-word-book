// Result card shown at the end of a round.
// Displays a dynamic title based on score, a score circle,
// and a compact vertical list of key metrics.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

/**
 * @param {Object} props
 * @param {number} props.score - Final score for the round (computed in gallery)
 * @param {() => void} props.onTryAgain - Resets state and starts a new round
 * @param {string} props.timeUsed - Formatted time used (e.g. 02:15:34)
 * @param {number} props.answeredCount - Number of submitted/finished cards
 * @param {number} props.accuracyPct - Percent of fully-correct cards (0-100)
 * @param {string|number=} props.rank - Optional rank to display (if available)
 */
const ResultCard = ({ score, onTryAgain, timeUsed, answeredCount, accuracyPct, rank }) => {
  const navigate = useNavigate();

  // Title text by performance tiers; also returns a CSS variable color
  // Using CSS variables ensures it overrides the fixed title color cleanly.
  const getPerformance = (score) => {
    if (score >= 1000) return { level: '牛波一啊！', colorVar: 'var(--color-green)' };
    if (score >= 500) return { level: '也就那么回事儿吧！', colorVar: 'var(--color-secondary)' };
    return { level: '你跟我扯犊子呢？', colorVar: 'var(--color-orange)' };
  };

  const performance = getPerformance(score);

  const handleGoHome = () => navigate('/');

  // Confetti theme colors to match app palette
  const THEME_COLORS = ['#0080BB', '#87D9FF', '#CEEAF9', '#95FF87', '#FF7787', '#FFC800'];
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  // Confetti celebration effect on mount
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
        <h2 className="result-title" style={{ color: performance.colorVar }}>{performance.level}</h2>
        <p className="result-subtitle">看看你做的好事！</p>
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-label">得分</span>
        </div>
        {/* Compact, single-line metric rows */}
        <div className="result-metrics-list">
          <div className="metric-row">
            <span className="metric-label">完成数量</span>
            <span className="metric-value">{answeredCount}</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">用时</span>
            <span className="metric-value">{timeUsed}</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">正确率</span>
            <span className="metric-value">{accuracyPct}%</span>
          </div>
          {rank != null && (
            <div className="metric-row">
              <span className="metric-label">排名</span>
              <span className="metric-value">{rank}</span>
            </div>
          )}
        </div>
        <div className="result-actions">
          <button onClick={onTryAgain} className="result-button try-again">重来</button>
          <button onClick={handleGoHome} className="result-button go-home">继续</button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
