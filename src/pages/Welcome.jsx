import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInput from '../components/home/ChatInput';

/**
 * Welcome Page - 单词王者 Landing
 * Simple, clean design matching app theme
 */
function Welcome() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handlePhoneSubmit = (phoneNumber) => {
        // Validate phone number (11 digits)
        if (phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
            setErrorMessage('请输入11位手机号码');
            return;
        }

        // Clear error
        setErrorMessage('');

        // Mark user as not first-time visitor
        localStorage.setItem('hasVisitedBefore', 'true');
        localStorage.setItem('userPhone', phoneNumber);

        // Navigate to conversation flow
        navigate('/home');
    };

    return (
        <div className="welcome-page">
            {/* Main content */}
            <div className="welcome-content">
                {/* Logo */}
                <div className="welcome-logo-container">
                    <img
                        src="/assets/wolfe_logo.png"
                        alt="单词王者"
                        className="welcome-logo"
                    />
                </div>

                {/* App Title */}
                <h1 className="welcome-title">单词王者</h1>

                {/* Error message */}
                {errorMessage && (
                    <p className="text-[var(--color-pink)] text-sm mb-2">{errorMessage}</p>
                )}

                {/* Phone Input - reusing ChatInput from home page */}
                <div className="welcome-input-section">
                    <ChatInput
                        placeholder="输入电话开始学习"
                        onSend={handlePhoneSubmit}
                        inputType="tel"
                        inputClassName="welcome-input-shimmer"
                    />
                </div>
            </div>
        </div>
    );
}

export default Welcome;
