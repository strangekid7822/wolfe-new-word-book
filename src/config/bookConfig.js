/**
 * Book Configuration
 * Maps grades to available textbook versions with cover images
 */

export const bookConfig = {
    grade7: [
        { cover: '/covers/PEP_2022_grade7_up.png', title: '2022版 上册', value: 'PEP_2022_grade7_up' },
        { cover: '/covers/PEP_2022_grade7_down.png', title: '2022版 下册', value: 'PEP_2022_grade7_down' },
        { cover: '/covers/PEP_2011_grade7_up.png', title: '2011版 上册', value: 'PEP_2011_grade7_up' },
        { cover: '/covers/PEP_2011_grade7_down.png', title: '2011版 下册', value: 'PEP_2011_grade7_down' }
    ],
    grade8: [
        { cover: '/covers/PEP_2022_grade8_up.png', title: '2022版 上册', value: 'PEP_2022_grade8_up' },
        { cover: '/covers/PEP_2022_grade8_down.png', title: '2022版 下册', value: 'PEP_2022_grade8_down' },
        { cover: '/covers/PEP_2011_grade8_up.png', title: '2011版 上册', value: 'PEP_2011_grade8_up' },
        { cover: '/covers/PEP_2011_grade8_down.png', title: '2011版 下册', value: 'PEP_2011_grade8_down' }
    ],
    grade9: [
        { cover: '/covers/PEP_2022_grade9.png', title: '2022版 全一册', value: 'PEP_2022_grade9' },
        { cover: '/covers/PEP_2011_grade9.png', title: '2011版 全一册', value: 'PEP_2011_grade9' }
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
