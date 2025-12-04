/**
 * Conversation Flow Configuration
 * 
 * This file defines all conversation branches and their behaviors.
 * Each key represents a conversation step with its message and next action.
 * 
 * Structure:
 * - message: String or function that returns the message text
 * - type: 'message' (default), 'input', or 'options'
 * - next: String (next step key) or function that determines next step
 * - options: Array of option buttons (for type: 'options')
 * - onResponse: Function that handles user input (for type: 'input')
 * - action: Function to execute (for navigation, etc.)
 */

export const conversationFlow = {
    // Initial greeting when user first loads the page
    greeting: {
        message: "Hi! Welcome to VocaVibe 👋",
        type: 'message',
        // Check if user has a name stored, if yes skip to welcomeBack
        next: (userName) => userName ? 'welcomeBack' : 'askName',
        delay: 800 // Typing delay in ms
    },

    // Ask for user's name if not stored
    askName: {
        message: "What should I call you?",
        type: 'input',
        placeholder: "My name is...",
        delay: 1000,
        // Handle the name input
        onResponse: (text) => {
            localStorage.setItem('userName', text);
            return {
                reply: `Nice to meet you, ${text}!`,
                next: 'mainMenu'
            };
        }
    },

    // Welcome back returning users
    welcomeBack: {
        message: (userName) => `Welcome back, ${userName}!`,
        type: 'message',
        next: 'mainMenu',
        delay: 800
    },

    // Main menu with action options
    mainMenu: {
        message: "What would you like to do today?",
        type: 'options',
        delay: 600,
        options: [
            { label: 'Start Word Test', next: 'startTest' },
            { label: 'Check Progress', next: 'checkProgress' }
        ]
    },

    // Start the word test
    startTest: {
        message: "Awesome! Let's get that brain working 🧠",
        type: 'message',
        delay: 800,
        next: 'loadingTest'
    },

    // Loading message before navigation
    loadingTest: {
        message: "Loading your test...",
        type: 'message',
        delay: 600,
        // Navigate to test page after showing message
        action: (navigate) => {
            setTimeout(() => navigate('/write'), 500);
        }
    },

    // Show user progress
    checkProgress: {
        message: "Let me check your stats... 📊",
        type: 'message',
        delay: 1000,
        next: 'showStats'
    },

    // Display stats (mock data for now)
    showStats: {
        message: "You're doing great! You've learned 124 words and have a 7-day streak. Keep it up! 🎉",
        type: 'message',
        delay: 800,
        next: 'askMoreHelp'
    },

    // Ask if user needs more help
    askMoreHelp: {
        message: "What else can I help you with?",
        type: 'options',
        delay: 600,
        options: [
            { label: 'Start Word Test', next: 'startTest' },
            { label: 'Check Progress', next: 'checkProgress' }
        ]
    }
};
