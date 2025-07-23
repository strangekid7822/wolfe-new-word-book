class AudioService {
  constructor() {
    this.isSupported = 'speechSynthesis' in window;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    
    if (this.isSupported) {
      this.initializeVoices();
    }
  }

  /**
   * Initialize and load available voices
   */
  initializeVoices() {
    const loadVoices = () => {
      this.voices = speechSynthesis.getVoices();
    };
    
    // Load voices immediately if available
    loadVoices();
    
    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Get the best English voice available
   * @returns {SpeechSynthesisVoice|null}
   */
  getEnglishVoice() {
    if (!this.voices.length) {
      this.voices = speechSynthesis.getVoices();
    }

    // Prefer US English voices
    const usVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en-US') || voice.lang.startsWith('en_US')
    );
    
    if (usVoices.length > 0) {
      return usVoices[0];
    }

    // Fall back to any English voice
    const englishVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en')
    );
    
    return englishVoices.length > 0 ? englishVoices[0] : null;
  }

  /**
   * Speak a word with English pronunciation
   * @param {string} word - Word to pronounce
   * @param {Object} options - Speech options
   * @returns {Promise<boolean>} - Success status
   */
  async speakWord(word, options = {}) {
    if (!this.isSupported) {
      console.warn('Speech Synthesis not supported in this browser');
      return false;
    }

    // Stop any current speech
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(word);
      
      // Configure speech settings
      const voice = this.getEnglishVoice();
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.8;  // Slightly slower for learning
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Set up event handlers
      return new Promise((resolve) => {
        utterance.onstart = () => {
          this.isPlaying = true;
          this.currentUtterance = utterance;
        };

        utterance.onend = () => {
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve(true);
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event.error);
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve(false);
        };

        // Start speaking
        speechSynthesis.speak(utterance);
      });
    } catch (error) {
      console.error('Error in speakWord:', error);
      return false;
    }
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.isSupported && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  /**
   * Check if currently speaking
   * @returns {boolean}
   */
  isSpeaking() {
    return this.isPlaying || (this.isSupported && speechSynthesis.speaking);
  }

  /**
   * Get available voices info for debugging
   * @returns {Array}
   */
  getAvailableVoices() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
      default: voice.default,
      localService: voice.localService
    }));
  }

  /**
   * Check if speech synthesis is supported
   * @returns {boolean}
   */
  isAudioSupported() {
    return this.isSupported;
  }
}

// Create and export singleton instance
const audioService = new AudioService();
export default audioService;