// Result card shown at the end of a round.
// Displays a dynamic title based on score, a score circle,
// and a compact vertical list of key metrics.
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import leaderboardService from '../services/leaderboardService';

/**
 * @param {Object} props
 * @param {number} props.score - Final score for the round (computed in gallery)
 * @param {() => void} props.onTryAgain - Resets state and starts a new round
 * @param {number} props.totalCount - Total number of questions/words in this course
 * @param {number} props.finishedCount - Number of finished questions/words in this course
 * @param {number} props.accuracyPct - Percent of fully-correct cards (0-100)
 * @param {string=} props.libraryId - Current library scope for leaderboard, used to segment ranks by course
 */
const ResultCard = ({ score, onTryAgain, totalCount, finishedCount, accuracyPct, libraryId }) => {
  const navigate = useNavigate();
  // Flip state: false = show score (front), true = show leaderboard (back)
  const [isFlipped, setIsFlipped] = useState(false);
  const [top3, setTop3] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [participants, setParticipants] = useState(0);
  // Submit-once guard not needed since this component mounts per result display
  const submittedOnce = useRef(false);

  // Title text by performance tiers; also returns a CSS variable color
  // Using CSS variables ensures it overrides the fixed title color cleanly.
  const getPerformance = (score) => {
    if (score >= 1000) return { level: '牛波一啊！', colorVar: 'var(--color-green)' };
    if (score >= 500) return { level: '也就那么回事儿吧！', colorVar: 'var(--color-secondary)' };
    return { level: '你跟我扯犊子呢？', colorVar: 'var(--color-orange)' };
  };

  const performance = getPerformance(score);

  // Confetti theme colors to match app palette
  const THEME_COLORS = ['#0080BB', '#87D9FF', '#CEEAF9', '#95FF87', '#FF7787', '#FFC800'];
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  // Confetti celebration effect on mount (front side)
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

  // Submit the result once on mount (localStorage is synchronous and fast).
  useEffect(() => {
    if (submittedOnce.current) return;
    submittedOnce.current = true;
    leaderboardService.submitScore({ libraryId, score, finishedCount, accuracyPct });
  }, [libraryId, score, finishedCount, accuracyPct]);

  // Load leaderboard only when flipped, to keep initial render light.
  useEffect(() => {
    if (!isFlipped) return;
    const t3 = leaderboardService.getTopN(libraryId, 3);
    const ur = leaderboardService.getUserRank(libraryId);
    setTop3(t3);
    setUserRank(ur.rank);
    setParticipants(ur.total);
  }, [isFlipped, libraryId]);

  // Continue behavior:
  // - First click: flip to leaderboard
  // - Second click: navigate home ('/')
  const handleContinue = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      return;
    }
    navigate('/');
  };

  return (
    <div className="result-card-container">
      <div className={`result-card flip-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="flipper">
          {/* Front */}
          <div className="front">
            <h2 className="result-title" style={{ color: performance.colorVar }}>{performance.level}</h2>
            <p className="result-subtitle">看看你做的好事！</p>
            <div className="score-circle">
              <span className="score-value">{score}</span>
              <span className="score-label">得分</span>
            </div>
            {/* Compact, single-line metric rows */}
            <div className="result-metrics-list">
              <div className="metric-row">
                <span className="metric-label">题目总数</span>
                <span className="metric-value">{totalCount}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">完成数量</span>
                <span className="metric-value">{finishedCount}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">正确率</span>
                <span className="metric-value">{accuracyPct}%</span>
              </div>
            </div>
            <div className="result-actions">
          <button onClick={onTryAgain} className="result-button try-again">重来</button>
          <button onClick={handleContinue} className="result-button go-home">继续</button>
            </div>
          </div>

          {/* Back: Leaderboard */}
          <div className="back">
            <h2 className="result-title">排行榜</h2>
            <p className="result-subtitle">{leaderboardService.getIntlRankText(userRank, participants)}</p>

            <div className="leaderboard-list">
              {(top3 && top3.length > 0) ? top3.map((entry, idx) => (
                <div key={entry.userId || idx} className="leaderboard-row">
                  <span className="rank-badge">{idx + 1}</span>
                  <div 
                    className="avatar"
                    style={{ backgroundColor: leaderboardService.hashToColor(entry.userId || String(idx)) }}
                    aria-label={entry.name}
                  >
                    {leaderboardService.initialsFromName(entry.name)}
                  </div>
                  <div className="leaderboard-name">{entry.name}</div>
                  <div className="leaderboard-score">{entry.score}</div>
                </div>
              )) : (
                <div className="metric-row">暂无数据</div>
              )}
            </div>

            <div className="leaderboard-user">
              <span className="metric-label">你的名次</span>
              <span className="metric-value">{userRank || '-'}/{participants}</span>
            </div>

            <div className="result-actions">
              <button onClick={onTryAgain} className="result-button try-again">重来</button>
              <button onClick={handleContinue} className="result-button go-home">继续</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
