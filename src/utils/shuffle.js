/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (does not modify original)
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffles an array in place
 * @param {Array} array - Array to shuffle (modifies original)
 * @returns {Array} - The same array, shuffled
 */
export function shuffleInPlace(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}