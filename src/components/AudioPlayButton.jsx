/**
 * Component for the audio play button with glassmorphism effects
 * Handles manual pronunciation playback with visual feedback
 */
const AudioPlayButton = ({ onPlayClick, isGlowing }) => {
  return (
    <div 
      className={`glass-effect glass-play-button rounded-full mb-4 ${isGlowing ? 'glowing' : ''}`} 
      onClick={onPlayClick}
    >
      <div className="glass-content">
        <svg className="glass-play-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  );
};

export default AudioPlayButton;