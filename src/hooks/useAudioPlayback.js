import { useState, useEffect } from 'react';
import audioService from '../services/audioService';

/**
 * Custom hook for managing audio playback functionality
 * Handles both auto-play and manual play button interactions
 */
export const useAudioPlayback = (word, isActive, isSubmitted) => {
  const [isGlowing, setIsGlowing] = useState(false);

  // Auto-play pronunciation when card becomes active
  useEffect(() => {
    if (isActive && !isSubmitted) {
      // Small delay to ensure smooth transition
      const playTimeout = setTimeout(async () => {
        try {
          await audioService.speakWord(word);
        } catch (error) {
          console.error('Error auto-playing audio:', error);
        }
      }, 500);
      
      return () => clearTimeout(playTimeout);
    }
  }, [isActive, word, isSubmitted]);

  // Handle manual play button click
  const handlePlayButtonClick = async () => {
    console.log('Playing pronunciation for word:', word);
    
    // Trigger the glow animation
    setIsGlowing(true);
    
    try {
      await audioService.speakWord(word);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
    
    // End glow animation after audio or timeout
    setTimeout(() => {
      setIsGlowing(false);
    }, 1500);
  };

  return {
    isGlowing,
    handlePlayButtonClick
  };
};