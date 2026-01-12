/**
 * Conversation Flow Configuration
 * Wuxia Style (武侠风格) Implementation
 * 
 * Step types: 'message' | 'input' | 'options' | 'scroll_picker' | 'upload' | 'pin'
 * - message: Auto-advancing app message
 * - input: Text input field
 * - options: Button selection (supports dynamic options via function)
 * - scroll_picker: Horizontal scroll picker (for long option lists)
 * - upload: File upload (e.g., avatar)
 * - pin: Numeric PIN input
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
        onResponse: () => {
            return {
                next: 'askGender'
            };
        }
    },

    // Step 3: Ask Gender
    askGender: {
        message: "不认识！你是男是女？",
        type: 'options',
        defaultValue: 'female',
        delay: 800,
        options: [
            { label: '♂ 男神', value: 'male' },
            { label: '♀ 女神', value: 'female' }
        ],
        formatUserMessage: (input) => {
            if (input === '♂ 男神') return '老子我是男的！';
            if (input === '♀ 女神') return '姑奶奶我是女的！';
            return input;
        },
        onSelect: () => {
            return {
                next: 'confirmPhoneFromWelcome'
            };
        }
    },

    /*
     * COMMENTED OUT: Avatar upload step (to be used in a later conversation)
     * Related files:
     *   - src/components/home/AvatarUploader.jsx (upload component)
     *   - src/components/home/Avatar.jsx (display component)
     *   - src/pages/Home.jsx: search "askAvatar" for handling logic
     *   - src/pages/Home.jsx: search "step.type === 'upload'" for UI rendering
     *
    // Step 4: Ask Avatar
    askAvatar: {
        message: "看不清楚，上传个头像我看看！",
        type: 'upload',
        delay: 800,
        buttonText: "📷 上传头像",
        formatUserMessage: () => "老贼！看好了！",
        onUpload: () => {
            return {
                next: 'complimentAvatar'
            };
        }
    },

    // Step 5: Compliment Avatar
    complimentAvatar: {
        message: "真是盛世美颜啊！",
        type: 'message',
        delay: 800,
        next: 'askGrade'
    },
    */

    /*
     * COMMENTED OUT: Grade selection step (to be used later)
     * Related files:
     *   - src/components/home/ScrollPicker.jsx (picker component)
     *   - src/pages/Home.jsx: search "askGrade" for handling logic
     *
    // Step 4: Ask Grade (UNUSED - grade is now asked in homeConversation)
    askGradeOld: {
        message: () => {
            const gender = localStorage.getItem('userGender');
            return gender === 'female' ? '美女，你现在几年级？' : '帅哥，你现在几年级？';
        },
        type: 'scroll_picker',
        defaultValue: '6',
        delay: 800,
        options: [
            { label: '一年级', value: '1' },
            { label: '二年级', value: '2' },
            { label: '三年级', value: '3' },
            { label: '四年级', value: '4' },
            { label: '五年级', value: '5' },
            { label: '六年级', value: '6' },
            { label: '七年级', value: '7' },
            { label: '八年级', value: '8' },
            { label: '九年级', value: '9' },
            { label: '高一', value: '10' },
            { label: '高二', value: '11' },
            { label: '高三', value: '12' }
        ],
        onSelect: () => {
            return {
                next: 'askPhone'
            };
        }
    },
    */
    // ========== REGISTRATION FLOW ==========

    // Step 4: Confirm phone from Welcome page
    confirmPhoneFromWelcome: {
        message: () => {
            const gender = localStorage.getItem('userGender');
            const phone = sessionStorage.getItem('enteredPhone') || '未知号码';
            return gender === 'female'
                ? `美女，这个电话号码 ${phone} 是你的吗？`
                : `帅哥，这个电话号码 ${phone} 是你的吗？`;
        },
        type: 'options',
        delay: 800,
        options: () => {
            const gender = localStorage.getItem('userGender');
            return gender === 'female'
                ? [
                    { label: '没错，老登！', value: 'correct' },
                    { label: '不对，刚才姑奶奶我输错了！', value: 'wrong' }
                ]
                : [
                    { label: '没错，老登！', value: 'correct' },
                    { label: '不对，刚才你爷爷我输错了！', value: 'wrong' }
                ];
        },
        onSelect: (value) => {
            if (value === 'correct') {
                // Save the phone from sessionStorage to localStorage
                const phone = sessionStorage.getItem('enteredPhone');
                if (phone) {
                    localStorage.setItem('userPhone', phone);
                    sessionStorage.removeItem('enteredPhone');
                }
                return { next: 'askPassword' };
            } else {
                return { next: 'askPhone' };
            }
        }
    },
    // Step 4b: Re-enter phone (only if Welcome page phone was wrong)
    askPhone: {
        message: "那麻烦少侠重新填写一下你的手机号码吧。",
        type: 'input',
        placeholder: "输入手机号码",
        inputType: 'tel',
        delay: 800,
        validate: (input) => input.length === 11 && /^\d+$/.test(input),
        validationError: "你有手机吗？手机号码是11位！看清楚！",
        onResponse: () => {
            return {
                next: 'confirmPhone'
            };
        }
    },
    // Step 5: Confirm re-entered phone
    confirmPhone: {
        message: "你敢不敢再输入一次，让我看看你有没有说错？",
        type: 'input',
        placeholder: "没办法再输入一次吧！",
        inputType: 'tel',
        delay: 800,
        validate: (input) => input.length === 11 && /^\d+$/.test(input),
        validationError: "你有手机吗？手机号码是11位！看清楚！",
        formatUserMessage: (input) => `老贼，你看好了！这是我的电话号码 ${input}！`,
        onResponse: () => {
            return {
                next: 'askPassword'
            };
        }
    },
    // Step 6: Introduce password requirement
    askPassword: {
        message: () => {
            const gender = localStorage.getItem('userGender');
            return gender === 'female' ? '好吧，美女，告诉我一个密码。' : '好吧，帅哥，告诉我一个密码。';
        },
        type: 'message',
        delay: 800,
        next: 'passwordNotice'
    },
    // Step 7: Enter 6-digit password
    passwordNotice: {
        message: "注意！密码只要六位数字，不然我可记不住！",
        type: 'pin',
        pinLength: 6,
        delay: 800,
        formatUserMessage: (input) => `老贼，这是我的密码，你可记住了！${input}`,
        onResponse: () => {
            return {
                next: 'passwordConfirm'
            };
        }
    },
    // Step 8: Registration complete
    passwordConfirm: {
        message: "记住了，以后你要是忘了，可别找我。只能联系你们那个帅气英俊的Wolfe老师，他知道所有人的密码。",
        type: 'message',
        delay: 800,
        next: 'homeConversation'
    },
    // Returning user (name found in localStorage) - currently unused
    welcomeBack: {
        message: (userName) => `久仰大名，${userName}！`,
        type: 'message',
        delay: 800,
        next: 'homeConversation'
    },

    // ========== HOME CONVERSATION (after login/registration) ==========

    // Entry point - checks if grade is set, routes accordingly
    homeConversation: {
        type: 'message',
        delay: 100, // Quick check, no visible delay
        next: () => {
            const grade = localStorage.getItem('userGrade');
            return grade ? 'homeMenu' : 'askGrade';
        }
    },

    // Ask grade if not set (first time after registration)
    askGrade: {
        message: () => {
            const gender = localStorage.getItem('userGender');
            return gender === 'female' ? '美女，你现在几年级？' : '帅哥，你现在几年级？';
        },
        type: 'scroll_picker',
        defaultValue: '7',
        delay: 800,
        options: [
            { label: '一年级', value: '1' },
            { label: '二年级', value: '2' },
            { label: '三年级', value: '3' },
            { label: '四年级', value: '4' },
            { label: '五年级', value: '5' },
            { label: '六年级', value: '6' },
            { label: '七年级', value: '7' },
            { label: '八年级', value: '8' },
            { label: '九年级', value: '9' },
            { label: '高一', value: '10' },
            { label: '高二', value: '11' },
            { label: '高三', value: '12' }
        ],
        onSelect: (value) => {
            localStorage.setItem('userGrade', value);
            return { next: 'homeMenu' };
        }
    },

    // Main menu - what do you want to do today?
    homeMenu: {
        message: () => {
            const gender = localStorage.getItem('userGender');
            const title = gender === 'female' ? '美女' : '帅哥';
            return `${title}，今天想做什么？`;
        },
        type: 'options',
        delay: 800,
        options: [
            { label: '📝 开始练功', value: 'practice' },
            { label: '📊 查看记录', value: 'progress' },
            { label: '⚙️ 门派设置', value: 'settings' }
        ],
        onSelect: (value) => {
            // TODO: Handle navigation based on selection
            if (value === 'practice') {
                // Navigate to word test
                return { next: 'startPractice' };
            }
            return { next: null };
        }
    },

    // ========== LOGIN FLOW FOR REGISTERED USERS ==========

    // Login Step 1: Ask for password
    loginAskPassword: {
        message: "密码是什么？我要验明正身！",
        type: 'message',
        delay: 800,
        next: 'loginInputPassword'
    },

    // Login Step 2: Password input
    loginInputPassword: {
        type: 'pin',
        pinLength: 6,
        delay: 400,
        formatUserMessage: (input) => `密码是 ${input}`,
        // Password validation handled in Home.jsx
        onResponse: () => {
            return { next: null }; // Navigation handled by Home.jsx based on validation
        }
    },

    // Login Step 3a: Success
    loginSuccess: {
        message: () => {
            const userName = localStorage.getItem('userName');
            return `真的是你啊！你可终于回来了，你都想死我了，我亲爱的${userName}！`;
        },
        type: 'message',
        delay: 800,
        next: 'homeConversation'
    },

    // Login Step 3b: Wrong password (1st attempt)
    loginWrongPassword1: {
        message: "不对！再输入一次！",
        type: 'message',
        delay: 600,
        next: 'loginInputPassword'
    },

    // Login Step 3c: Wrong password (2nd attempt)
    loginWrongPassword2: {
        message: "不对！自己的密码都记不住！再试一次！",
        type: 'message',
        delay: 600,
        next: 'loginInputPassword'
    },

    // Login Step 3d: Wrong password (3+ attempts - locked)
    loginWrongPasswordFinal: {
        message: "快来人啊！有个傻子记不住自己的密码！忘了密码你找Wolfe啊！",
        type: 'message',
        delay: 800
        // No next - user is locked out
    }
};
