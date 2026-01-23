import { shuffle } from '../utils/shuffle.js';

class QuestionService {
  constructor() {
    this.vocabularyData = null;
    this.availableWords = [];
    this.shuffledWords = [];
    this.currentIndex = 0;
    this.currentLibrary = null;
  }

  /**
   * Load vocabulary data from JSON file
   * @param {string} libraryPath - Path to JSON library file (e.g., 'PEP_2022_grade7_up.json')
   * @returns {Promise<boolean>} - Success status
   */
  async loadLibrary(libraryPath = 'PEP_2022_grade7_up.json') {
    try {
      const response = await fetch(`/Library/${libraryPath}`);
      if (!response.ok) {
        throw new Error(`Failed to load library: ${response.status}`);
      }

      const data = await response.json();
      this.vocabularyData = data;
      this.currentLibrary = libraryPath;

      // Extract all vocabulary words from all textbooks
      // Filter: only words with >= 3 letters, exclude phrases
      this.availableWords = [];
      if (data.textbooks && Array.isArray(data.textbooks)) {
        data.textbooks.forEach(textbook => {
          if (textbook.vocabulary && Array.isArray(textbook.vocabulary)) {
            const filteredWords = textbook.vocabulary.filter(word =>
              word.word.length >= 3 && !word.is_phrase
            );
            this.availableWords.push(...filteredWords);
          }
        });
      }

      // Shuffle the words for random order
      this.shuffledWords = shuffle(this.availableWords);
      this.currentIndex = 0;

      console.log(`Loaded ${this.availableWords.length} words from ${libraryPath}`);
      return true;
    } catch (error) {
      console.error('Error loading vocabulary library:', error);
      this.vocabularyData = null;
      this.availableWords = [];
      return false;
    }
  }

  /**
   * Load vocabulary filtered by specific unit
   * @param {string} libraryPath - Path to JSON library file
   * @param {string} unitName - Unit name to filter by
   * @returns {Promise<boolean>} - Success status
   */
  async loadLibraryWithUnit(libraryPath, unitName) {
    try {
      const response = await fetch(`/Library/${libraryPath}`);
      if (!response.ok) {
        throw new Error(`Failed to load library: ${response.status}`);
      }

      const data = await response.json();
      this.vocabularyData = data;
      this.currentLibrary = libraryPath;

      // Extract vocabulary filtered by unit
      // Filter: only words with >= 3 letters, exclude phrases, match unit
      this.availableWords = [];
      if (data.textbooks && Array.isArray(data.textbooks)) {
        data.textbooks.forEach(textbook => {
          if (textbook.vocabulary && Array.isArray(textbook.vocabulary)) {
            const filteredWords = textbook.vocabulary.filter(word =>
              word.word.length >= 3 &&
              !word.is_phrase &&
              word.unit === unitName
            );
            this.availableWords.push(...filteredWords);
          }
        });
      }

      // Shuffle the words for random order
      this.shuffledWords = shuffle(this.availableWords);
      this.currentIndex = 0;

      console.log(`Loaded ${this.availableWords.length} words from ${libraryPath} (${unitName})`);
      return true;
    } catch (error) {
      console.error('Error loading vocabulary library:', error);
      this.vocabularyData = null;
      this.availableWords = [];
      return false;
    }
  }

  /**
   * Get unique unit names from loaded vocabulary data
   * @returns {Array<string>} - Array of unit names
   */
  getUnits() {
    if (!this.vocabularyData) return [];

    const units = new Set();
    if (this.vocabularyData.textbooks && Array.isArray(this.vocabularyData.textbooks)) {
      this.vocabularyData.textbooks.forEach(textbook => {
        if (textbook.vocabulary && Array.isArray(textbook.vocabulary)) {
          textbook.vocabulary.forEach(word => {
            if (word.unit) units.add(word.unit);
          });
        }
      });
    }
    return Array.from(units);
  }

  /**
   * Load library and return units (helper for unit selection step)
   * @param {string} libraryPath - Path to JSON library file
   * @returns {Promise<Array<string>>} - Array of unit names
   */
  async getUnitsFromLibrary(libraryPath) {
    await this.loadLibrary(libraryPath);
    return this.getUnits();
  }

  /**
   * Generate a single question from available vocabulary
   * @returns {Object|null} - Question object or null if no more words
   */
  generateQuestion() {
    // Check if we need to reshuffle
    if (this.currentIndex >= this.shuffledWords.length) {
      console.log(`Reshuffling at index ${this.currentIndex} of ${this.shuffledWords.length}`);
      this.shuffledWords = shuffle(this.availableWords);
      this.currentIndex = 0;
    }

    // Get next word sequentially from shuffled array
    const wordData = this.shuffledWords[this.currentIndex++];

    if (!wordData) {
      console.warn('No available words found');
      return null;
    }

    // Create options array with correct meaning and false meanings
    const options = [wordData.meaning, ...wordData.false_meanings];
    const shuffledOptions = shuffle(options);
    const correctIndex = shuffledOptions.indexOf(wordData.meaning);

    // Generate question object
    const question = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      word: wordData.word,
      phonetic: wordData.phonetic || '',
      unit: wordData.unit || '',
      partOfSpeech: wordData.part_of_speech || '',
      correctMeaning: wordData.meaning,
      options: shuffledOptions,
      correctIndex: correctIndex,
      inputs: new Array(wordData.word.length).fill(''),
      submitted: false,
      selectedOption: ''
    };

    return question;
  }

  /**
   * Generate multiple questions
   * @param {number} count - Number of questions to generate
   * @returns {Array} - Array of question objects
   */
  generateQuestions(count = 5) {
    const questions = [];
    for (let i = 0; i < count; i++) {
      const question = this.generateQuestion();
      if (question) {
        questions.push(question);
      } else {
        break; // No more words available
      }
    }
    return questions;
  }

  /**
   * Check if a word spelling is correct
   * @param {string} word - Original word
   * @param {Array} inputs - User input array
   * @returns {boolean} - Whether spelling is correct
   */
  checkSpelling(word, inputs) {
    if (!word || !inputs || inputs.length !== word.length) {
      return false;
    }

    const userWord = inputs.join('').toLowerCase();
    return userWord === word.toLowerCase();
  }

  /**
   * Check if a meaning selection is correct
   * @param {Object} question - Question object
   * @param {string} selectedOption - User selected option
   * @returns {boolean} - Whether selection is correct
   */
  checkMeaning(question, selectedOption) {
    return selectedOption === question.correctMeaning;
  }

  /**
   * Get statistics about current library
   * @returns {Object} - Statistics object
   */
  getStats() {
    return {
      totalWords: this.availableWords.length,
      usedWords: this.currentIndex,
      remainingWords: this.shuffledWords.length - this.currentIndex,
      currentLibrary: this.currentLibrary
    };
  }

  /**
   * Reset the service (clear used words)
   */
  reset() {
    this.currentIndex = 0;
    if (this.availableWords.length > 0) {
      this.shuffledWords = shuffle(this.availableWords);
    }
  }
}

// Create and export a singleton instance
const questionService = new QuestionService();
export default questionService;