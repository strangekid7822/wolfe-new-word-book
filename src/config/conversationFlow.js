/**
 * Conversation Flow Configuration
 * Wuxia Style Implementation
 */

export const conversationFlow = {
    // Step 1: Greeting
    greeting: {
        message: "前方何人，报上名来！",
        type: 'message',
        next: (userName) => userName ? 'welcomeBack' : 'askName',
        delay: 800
    },

    // Step 2: Input Name
    askName: {
        type: 'input',
        placeholder: "输入我的名字",
        delay: 1000,
        formatUserMessage: (input) => `我是${input}！你可认得？`,
        onResponse: (text) => {
            localStorage.setItem('userName', text);
            return {
                next: 'askGender'
            };
        }
    },

    // Step 3: Ask Gender
    askGender: {
        message: "不认识！你是男是女？",
        type: 'options',
        delay: 800,
        options: [
            { label: '♂ 男', value: 'male' },
            { label: '♀ 女', value: 'female' }
        ],
        formatUserMessage: (input) => {
            if (input === '♂ 男') return '老子我是男的！';
            if (input === '♀ 女') return '姑奶奶我是女的！';
            return input;
        },
        onSelect: (value) => {
            localStorage.setItem('userGender', value);
            return {
                // Pause here for now
            };
        }
    },

    // Handle existing users
    welcomeBack: {
        message: (userName) => `久仰大名，${userName}！`,
        type: 'message',
        delay: 800
        // TODO: Define next step for returning users
    }
};
