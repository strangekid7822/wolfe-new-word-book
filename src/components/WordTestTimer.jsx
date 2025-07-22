import { useTimer } from '../contexts/TimerContext';

function WordTestTimer() {
  // Get timer state from context (percentage, color, time remaining, and formatted time)
  const { percentage, timerColor, formattedTime } = useTimer();
  
  return (
    <div className="flex flex-col items-center">
      {/* Digital timer display above progress bar - color changes with time remaining like timer bar */}
      <div className="text-center mb-2">
        <span 
          className="[--txt-display] font-mono transition-colors duration-300" 
          style={{ color: timerColor }}
        >
          {formattedTime}
        </span>
      </div>
      
      {/* Timer progress bar with enhanced darker shadow for better visibility */}
      <div className="timer-shadow-style w-[var(--content-width-2)] h-5 overflow-hidden relative flex">
        {/* The actual progress bar that now shrinks from left to right with continuous glow effect */}
        <div 
          className="animated-glow-wrapper h-full transition-all duration-300 ml-auto" 
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
