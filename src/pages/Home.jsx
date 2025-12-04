import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBubble from '../components/home/MessageBubble';
import Avatar from '../components/home/Avatar';
import TypingIndicator from '../components/home/TypingIndicator';
import ChatInput from '../components/home/ChatInput';
import OptionChips from '../components/home/OptionChips';
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
   */
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;
      processStep('greeting');
    }
  }, []);

  /**
   * Add a message to the chat
   */
  const addMessage = (text, isUser = false) => {
    setMessages(prev => [...prev, { text, isUser }]);
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

    // Show typing indicator
    setIsTyping(true);
    await new Promise(r => setTimeout(r, step.delay || 600));
    setIsTyping(false);

    // Get message text (could be string or function)
    const messageText = typeof step.message === 'function'
      ? step.message(userName)
      : step.message;

    addMessage(messageText, false);

    // Update current step
    setCurrentStep(stepKey);

    // Execute any additional actions
    if (step.action) {
      step.action(navigate);
    }

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

    // Add user message
    addMessage(input, true);

    // Handle input type
    if (step.type === 'input' && step.onResponse) {
      const result = step.onResponse(input);

      // Update userName if it was just set
      if (currentStep === 'askName') {
        setUserName(input);
      }

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
      if (selectedOption && selectedOption.next) {
        await new Promise(r => setTimeout(r, 400));
        processStep(selectedOption.next);
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
        />
      );
    }

    // Option buttons for menu steps
    if (step.type === 'options' && step.options) {
      return (
        <OptionChips
          options={step.options}
          onSelect={handleUserInput}
        />
      );
    }

    return null;
  };

  const inputContent = renderInputArea();
  const isInputVisible = !!inputContent;

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div className="flex-grow overflow-y-auto pb-24">
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
  );
}

export default Home;
