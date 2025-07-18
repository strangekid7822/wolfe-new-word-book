import { useTimer } from '../contexts/TimerContext';

function WordTestTimer() {
  // Get timer state from context (percentage, color, time remaining, and formatted time)
  const { percentage, timerColor, formattedTime } = useTimer();
  
  return (
    <div className="flex flex-col items-center">
      {/* Digital timer display above progress bar - color changes with time remaining like timer bar */}
      <div className="text-center mb-2">
        <span 
          className="text-lg font-mono font-semibold transition-colors duration-300" 
          style={{ color: timerColor }}
        >
          {formattedTime}
        </span>
      </div>
      
      {/* Simplified timer progress bar */}
      <div className="timer-wrapper-style w-64 w-[var(--content-width-2)] h-4 overflow-hidden">
        {/* The actual progress bar that grows/shrinks and changes color, now aligned to the right */}
        <div 
          className="h-full transition-all duration-300 ml-auto" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: timerColor
          }}
        ></div>
      </div>
    </div>
  );
}

export default WordTestTimer;
