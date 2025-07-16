import { createContext, useContext, useState, useEffect } from 'react';

// Create timer context for sharing countdown state across components
const TimerContext = createContext();

// Custom hook to use timer context with error handling
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

// Timer provider component that manages 3-minute countdown state
export const TimerProvider = ({ children }) => {
  // 3 minutes in seconds (180 seconds total)
  const TOTAL_TIME = 180;
  
  // Timer state: remaining time in seconds
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  
  // Calculate percentage of time remaining (0-100)
  const percentage = (timeLeft / TOTAL_TIME) * 100;
  
  // Determine timer bar color based on remaining time percentage
  const getTimerColor = () => {
    if (percentage > 50) {
      // More than 50% remaining: use secondary color (blue)
      return 'var(--color-secondary)';
    } else if (percentage > 30) {
      // 30-50% remaining: use orange-yellow warning color
      return 'var(--color-orange-yellow)';
    } else {
      // Less than 30% remaining: use orange critical color
      return 'var(--color-orange)';
    }
  };
  
  // Start smooth countdown timer when provider mounts
  useEffect(() => {
    // Record the start time for smooth countdown calculation
    const startTime = Date.now();
    let animationFrame;
    
    // Use requestAnimationFrame for smooth, constant timer updates
    const updateTimer = () => {
      const elapsed = (Date.now() - startTime) / 1000; // Elapsed time in seconds
      const remaining = Math.max(0, TOTAL_TIME - elapsed); // Calculate remaining time
      
      setTimeLeft(remaining);
      
      // Continue animation if time remaining, otherwise stop
      if (remaining > 0) {
        animationFrame = requestAnimationFrame(updateTimer);
      }
    };
    
    // Start the smooth timer animation
    animationFrame = requestAnimationFrame(updateTimer);
    
    // Cleanup animation frame on component unmount
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []); // Empty dependency - only run once on mount
  
  // Context value object containing timer state and utilities
  const value = {
    timeLeft,           // Remaining seconds
    percentage,         // Percentage remaining (0-100)
    timerColor: getTimerColor(), // Current color based on time left
    isTimeUp: timeLeft === 0,    // Boolean flag for time expiration
    totalTime: TOTAL_TIME        // Total duration for reference
  };
  
  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};