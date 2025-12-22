import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RollingComments from '../components/welcome/RollingComments';

/**
 * Welcome Page - 单词王者 Landing
 * 王者荣耀 inspired design for first-time users
 */
function Welcome() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        setPhoneNumber(value);
        // Clear error when user starts typing again
        if (hasError) {
            setHasError(false);
            setErrorMessage('');
        }
    };

    const handleSubmit = () => {
        if (phoneNumber.length !== 11) {
            setHasError(true);
            setErrorMessage('请输入11位手机号码');
            return;
        }

        // Mark user as not first-time visitor
        localStorage.setItem('hasVisitedBefore', 'true');
        localStorage.setItem('userPhone', phoneNumber);

        // TODO: Check if phone exists in database
        // For now, always go to conversation flow (new user)
        navigate('/');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="welcome-page">
            {/* Background particles/effects */}
            <div className="welcome-bg-effects">
                <div className="welcome-glow welcome-glow-1"></div>
                <div className="welcome-glow welcome-glow-2"></div>
                <div className="welcome-glow welcome-glow-3"></div>
            </div>

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
                <p className="welcome-subtitle">背单词，就是这么简单</p>

                {/* Phone Input Section */}
                <div className="welcome-input-section">
                    <div className="welcome-input-wrapper">
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder={hasError ? errorMessage : '输入电话，开始学习'}
                            className={`welcome-input ${hasError ? 'welcome-input-error' : ''}`}
                            maxLength={11}
                            autoFocus
                        />

                        {/* Send Button */}
                        <div
                            className={`welcome-send-btn-container ${phoneNumber.length > 0 ? 'visible' : ''}`}
                        >
                            <button
                                onClick={handleSubmit}
                                className="welcome-send-btn"
                            >
                                开始
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rolling Comments */}
                <div className="welcome-comments-section">
                    <RollingComments />
                </div>
            </div>
        </div>
    );
}

export default Welcome;
