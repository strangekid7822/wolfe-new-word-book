import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBubble from '../components/home/MessageBubble';
import Avatar from '../components/home/Avatar';
import TypingIndicator from '../components/home/TypingIndicator';
import ChatInput from '../components/home/ChatInput';
import OptionChips from '../components/home/OptionChips';
import ScrollPicker from '../components/home/ScrollPicker';
import AvatarUploader from '../components/home/AvatarUploader';
import PinInput from '../components/home/PinInput';
import { conversationFlow } from '../config/conversationFlow';
import InputAreaWrapper from '../components/home/InputAreaWrapper';

/**
 * Home Page - Conversational Interface
 * Uses configuration-driven conversation flow from conversationFlow.js
 */
function Home() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Temporary registration data (saved only after password is set)
  const [pendingUser, setPendingUser] = useState({
    name: '',
    gender: '',
    avatar: '',
    grade: '',
    phone: '',
    phoneConfirm: '',
    password: ''
  });

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /**
   * Initialize conversation on component mount
   * Check if user is registered (phone matches + password exists)
   */
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;

      // Get phone from sessionStorage (set by Welcome page)
      const enteredPhone = sessionStorage.getItem('enteredPhone');
      const storedPhone = localStorage.getItem('userPhone');
      const storedPassword = localStorage.getItem('userPassword');
      const storedName = localStorage.getItem('userName');

      // Check if this is a registered user (phone matches + password exists)
      const isRegisteredUser = enteredPhone && storedPhone &&
        enteredPhone === storedPhone && storedPassword;

      if (isRegisteredUser) {
        setUserName(storedName || '');
        processStep('loginAskPassword');
      } else {
        processStep('greeting');
      }

      // Clear sessionStorage after reading
      sessionStorage.removeItem('enteredPhone');
    }
  }, []);

  /**
   * Add a message to the chat
   */
  const addMessage = (text, isUser = false) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  /**
   * Save all pending registration data to localStorage
   * Called only after password is successfully set
   */
  const saveUserData = (userData) => {
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userGender', userData.gender);
    localStorage.setItem('userAvatar', userData.avatar);
    localStorage.setItem('userGrade', userData.grade);
    localStorage.setItem('userPhone', userData.phone);
    localStorage.setItem('userPassword', userData.password);
    console.log('User registration saved:', userData);
  };

  /**
   * Process a conversation step from the flow configuration
   * @param {string} stepKey - The key of the step in conversationFlow
   * @param {any} context - Optional context data (e.g., user input)
   */
  const processStep = async (stepKey, context = null) => {
    const step = conversationFlow[stepKey];
    if (!step) {
      console.error(`Step "${stepKey}" not found in conversationFlow`);
      return;
    }

    // Get message text (could be string or function)
    const messageText = typeof step.message === 'function'
      ? step.message(userName)
      : step.message;

    // Show typing indicator only if there is a message from the app
    if (messageText) {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, step.delay || 600));
      setIsTyping(false);
    }

    if (messageText) {
      addMessage(messageText, false);
    }

    // Update current step
    setCurrentStep(stepKey);

    // Set waitingForInput based on step type
    setWaitingForInput(step.type === 'input' || step.type === 'options' || step.type === 'upload' || step.type === 'pin' || step.type === 'scroll_picker');

    // Execute any additional actions
    if (step.action) {
      step.action(navigate, addMessage, userName);
    }

    // Note: User data is now saved in handleUserInput when passwordNotice step completes
    // (moved there to fix async state timing issue with password)

    // Auto-proceed to next step if it's a simple message
    if (step.type === 'message' && step.next) {
      await new Promise(r => setTimeout(r, 800));

      // Determine next step (could be string or function)
      const nextStep = typeof step.next === 'function'
        ? step.next(userName)
        : step.next;

      if (nextStep) {
        processStep(nextStep);
      }
    }
  };

  /**
   * Handle user input (text or option selection)
   * @param {string} input - User's input text or selected option
   */
  const handleUserInput = async (input) => {
    const step = conversationFlow[currentStep];

    // Run validation if defined in step config
    if (step.validate && !step.validate(input)) {
      addMessage(input, true); // Show user's invalid input
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(false);
      addMessage(step.validationError || "输入无效", false);
      setWaitingForInput(true); // Show input again
      return; // Don't proceed
    }

    // Add user message (formatted if config specifies)
    const displayMessage = step.formatUserMessage ? step.formatUserMessage(input) : input;
    addMessage(displayMessage, true);

    // Hide input wrapper after user responds
    setWaitingForInput(false);

    // Collect registration data based on current step (store temporarily)
    if (currentStep === 'askName') {
      setPendingUser(prev => ({ ...prev, name: input }));
      setUserName(input); // Keep for display purposes
    }
    if (currentStep === 'askGender') {
      const value = input === '♂ 男神' ? 'male' : 'female';
      setPendingUser(prev => ({ ...prev, gender: value }));
      // Store temporarily for dynamic messages during registration
      localStorage.setItem('userGender', value);
    }
    if (currentStep === 'askAvatar') {
      setPendingUser(prev => ({ ...prev, avatar: input }));
    }
    if (currentStep === 'askGrade') {
      const selectedOption = conversationFlow[currentStep].options.find(opt => opt.label === input);
      setPendingUser(prev => ({ ...prev, grade: selectedOption?.value || input }));
    }
    if (currentStep === 'askPhone') {
      setPendingUser(prev => ({ ...prev, phone: input }));
    }
    if (currentStep === 'confirmPhone') {
      setPendingUser(prev => ({ ...prev, phoneConfirm: input }));
    }
    if (currentStep === 'passwordNotice') {
      setPendingUser(prev => ({ ...prev, password: input }));
    }

    // Handle input type
    if (step.type === 'input' && step.onResponse) {
      const result = step.onResponse(input);

      // Show response and move to next
      if (result.reply) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 800));
        setIsTyping(false);
        addMessage(result.reply, false);
      }

      if (result.next) {
        await new Promise(r => setTimeout(r, 600));
        processStep(result.next);
      }
    }

    // Handle option selection
    if (step.type === 'options') {
      const selectedOption = step.options.find(opt => opt.label === input);

      // Execute onSelect callback if defined
      if (selectedOption && step.onSelect) {
        const result = step.onSelect(selectedOption.value);
        if (result && result.next) {
          await new Promise(r => setTimeout(r, 400));
          processStep(result.next);
        }
      } else if (selectedOption && selectedOption.next) {
        await new Promise(r => setTimeout(r, 400));
        processStep(selectedOption.next);
      }
    }

    // Handle upload
    if (step.type === 'upload' && step.onUpload) {
      const result = step.onUpload(input);
      if (result && result.next) {
        await new Promise(r => setTimeout(r, 400));
        processStep(result.next);
      }
    }

    // Handle PIN input
    if (step.type === 'pin' && step.onResponse) {
      // Special handling for login password validation
      if (currentStep === 'loginInputPassword') {
        const storedPassword = localStorage.getItem('userPassword');
        if (input === storedPassword) {
          // Password correct - reset attempts and go to success
          setLoginAttempts(0);
          await new Promise(r => setTimeout(r, 400));
          processStep('loginSuccess');
        } else {
          // Password incorrect - increment attempts and show appropriate error
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);
          await new Promise(r => setTimeout(r, 400));

          if (newAttempts === 1) {
            processStep('loginWrongPassword1');
          } else if (newAttempts === 2) {
            processStep('loginWrongPassword2');
          } else {
            processStep('loginWrongPasswordFinal');
          }
        }
        return;
      }

      // Registration: save user data when password is entered
      // Note: We use input directly here because React state updates are async
      if (currentStep === 'passwordNotice') {
        saveUserData({ ...pendingUser, password: input });
      }

      const result = step.onResponse(input);
      if (result && result.next) {
        await new Promise(r => setTimeout(r, 400));
        processStep(result.next);
      }
    }

    // Handle Scroll Picker
    if (step.type === 'scroll_picker' && step.onSelect) {
      const result = step.onSelect(input);
      if (result && result.next) {
        await new Promise(r => setTimeout(r, 400));
        processStep(result.next);
      }
    }
  };

  /**
   * Render input area based on current step type
   */
  const renderInputArea = () => {
    if (isTyping) return null;

    const step = conversationFlow[currentStep];
    if (!step) return null;

    // Text input for askName step
    if (step.type === 'input') {
      return (
        <ChatInput
          placeholder={step.placeholder}
          onSend={handleUserInput}
          inputType={step.inputType}
        />
      );
    }

    // Option buttons for menu steps
    if (step.type === 'options' && step.options) {
      return (
        <OptionChips
          options={step.options}
          onSelect={handleUserInput}
          layout={step.layout}
        />
      );
    }

    // Avatar upload
    if (step.type === 'upload') {
      return (
        <AvatarUploader
          buttonText={step.buttonText}
          onUpload={(base64) => handleUserInput(base64)}
        />
      );
    }

    // PIN input for password
    if (step.type === 'pin') {
      return (
        <PinInput
          length={step.pinLength || 6}
          onSubmit={handleUserInput}
        />
      );
    }

    // Scroll Picker
    if (step.type === 'scroll_picker') {
      return (
        <ScrollPicker
          options={step.options}
          onSelect={handleUserInput}
          defaultValue={step.defaultValue}
        />
      );
    }

    return null;
  };

  const inputContent = renderInputArea();
  const isInputVisible = waitingForInput && !!inputContent;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 pt-4 gap-2 overflow-y-auto main-container-style">
      <div className="flex flex-col h-full flex-grow">
        {/* Messages Area - Scrollable */}
        {/* pb-48 (12rem/192px) is a brute-force buffer to prevent the bottom InputAreaWrapper 
          (which is fixed or sticky) from overlapping the last few messages. 
          This large padding ensures the user can always scroll the last message into view. */}
        <div className="flex-grow overflow-y-auto pb-48">
          <div className="flex flex-col justify-end min-h-full">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} text={msg.text} isUser={msg.isUser} />
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input / Options Area - Fixed at bottom */}
        <InputAreaWrapper visible={isInputVisible}>
          {inputContent}
        </InputAreaWrapper>
      </div>
    </div>
  );
}

export default Home;
