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
  
  // Start countdown timer when provider mounts
  useEffect(() => {
    // Record the start time for accurate countdown calculation
    const startTime = Date.now();
    let timer;
    
    // Mobile Safari-friendly timer implementation
    // Uses setInterval with frequent updates for cross-platform compatibility
    const updateTimer = () => {
      const elapsed = (Date.now() - startTime) / 1000; // Elapsed time in seconds
      const remaining = Math.max(0, TOTAL_TIME - elapsed); // Calculate remaining time
      
      setTimeLeft(remaining);
      
      // Stop timer when time is up
      if (remaining <= 0) {
        clearInterval(timer);
      }
    };
    
    // Start timer with 50ms intervals for smooth updates on all platforms
    // More frequent than 100ms to ensure smooth animation on mobile Safari
    timer = setInterval(updateTimer, 50);
    
    // Initial update to start immediately
    updateTimer();
    
    // Cleanup timer on component unmount
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []); // Empty dependency - only run once on mount
  
  // Format time as MM:SS:ms (minutes:seconds:centiseconds)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.floor((seconds % 1) * 100); // Convert decimal to centiseconds (0-99)
    
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
  };

  // Context value object containing timer state and utilities
  const value = {
    timeLeft,           // Remaining seconds
    percentage,         // Percentage remaining (0-100)
    timerColor: getTimerColor(), // Current color based on time left
    isTimeUp: timeLeft === 0,    // Boolean flag for time expiration
    totalTime: TOTAL_TIME,       // Total duration for reference
    formatTime,         // Time formatting utility function
    formattedTime: formatTime(timeLeft) // Pre-formatted time string
  };
  
  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};