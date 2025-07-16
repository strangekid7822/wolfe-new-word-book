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
      
      {/* Timer progress bar wrapper with word card styling */}
      <div className="timer-wrapper-style p-1 w-64 w-[var(--content-width-2)]">
        {/* Timer track (background bar) - increased height to make white border appear thinner */}
        <div className="bg-[var(--color-white)] rounded-full h-2 flex items-center">
          {/* Timer progress bar - increased height and width decreases as time runs out, color changes based on remaining time */}
          <div 
            className="h-3 rounded-full ml-auto transition-all duration-300 animated-glow-wrapper" 
            style={{ 
              width: `${percentage}%`,  // Width represents time remaining percentage
              backgroundColor: timerColor  // Color changes: secondary → orange-yellow → orange
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WordTestTimer;
