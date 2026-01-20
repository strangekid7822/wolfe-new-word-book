/**
 * Book Configuration
 * Maps grades to available textbook versions with cover images
 */

export const bookConfig = {
    grade7: [
        { cover: '/covers/grade7_up_2024.png', title: '2024新版 上册', value: 'grade7_up_2024' },
        { cover: '/covers/grade7_down_2025.png', title: '2025新版 下册', value: 'grade7_down_2025' },
        { cover: '/covers/grade7_up_2011.png', title: '2011版 上册', value: 'grade7_up_2011' },
        { cover: '/covers/grade7_down_2011.png', title: '2011版 下册', value: 'grade7_down_2011' }
    ],
    grade8: [
        { cover: '/covers/grade8_up_2025.png', title: '2025新版 上册', value: 'grade8_up_2025' },
        { cover: '/covers/grade8_down_2026.png', title: '2026新版 下册', value: 'grade8_down_2026' },
        { cover: '/covers/grade8_up_2011.png', title: '2011版 上册', value: 'grade8_up_2011' },
        { cover: '/covers/grade8_down_2011.png', title: '2011版 下册', value: 'grade8_down_2011' }
    ],
    grade9: [
        { cover: '/covers/grade9_full_2011.png', title: '2011版 全一册', value: 'grade9_full_2011' }
    ]
};

/**
 * Get books for a given vocabulary selection
 * @param {string} vocabularyValue - e.g., 'grade7', 'grade8'
 * @returns {Array} Array of book objects
 */
export const getBooksForVocabulary = (vocabularyValue) => {
    return bookConfig[vocabularyValue] || [];
};
