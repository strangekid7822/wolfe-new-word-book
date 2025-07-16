import { useTimer } from '../contexts/TimerContext';

function WordTestTimer() {
  // Get timer state from context (percentage, color, and time remaining)
  const { percentage, timerColor } = useTimer();
  
  return (
    <div className="flex justify-center">
      {/* Timer wrapper with white background and shadow */}
      <div className="bg-[var(--color-white)] rounded-full p-1 w-64 shadow-[var(--shadow-timer)] w-[var(--content-width-2)]">
        {/* Timer track (background bar) */}
        <div className="bg-[var(--color-white)] rounded-full h-2.5">
          {/* Timer progress bar - width decreases as time runs out, color changes based on remaining time */}
          <div 
            className="h-2.5 rounded-full ml-auto transition-all duration-300" 
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
