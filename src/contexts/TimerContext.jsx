import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children }) => {
  const TOTAL_TIME = 180;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const timerEndCallbackRef = useRef(null);
  const timerRef = useRef(null);

  const percentage = (timeLeft / TOTAL_TIME) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return 'var(--color-secondary)';
    if (percentage > 30) return 'var(--color-orange-yellow)';
    return 'var(--color-orange)';
  };

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    const startTime = Date.now();
    
    const updateTimer = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, TOTAL_TIME - elapsed);
      
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        stopTimer();
        if (timerEndCallbackRef.current) {
          const callbackThunk = timerEndCallbackRef.current();
          if (typeof callbackThunk === 'function') {
            callbackThunk();
          }
        }
      }
    };
    
    timerRef.current = setInterval(updateTimer, 50);
    updateTimer();
  }, [stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer]);

  const resetTimer = useCallback(() => {
    setTimeLeft(TOTAL_TIME);
    startTimer();
  }, [startTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.floor((seconds % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
  };

  const setOnTimerEnd = useCallback((callback) => {
    timerEndCallbackRef.current = callback;
  }, []);

  const value = {
    timeLeft,
    percentage,
    timerColor: getTimerColor(),
    isTimeUp: timeLeft <= 0,
    totalTime: TOTAL_TIME,
    formatTime,
    formattedTime: formatTime(timeLeft),
    setOnTimerEnd,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};
