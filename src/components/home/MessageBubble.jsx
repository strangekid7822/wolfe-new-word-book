import Avatar from './Avatar';

/**
 * MessageBubble component
 * Displays individual chat messages with optional avatar
 * Styled to resemble WeChat bubbles
 */
const MessageBubble = ({ text, isUser, showAvatar = true }) => {
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {/* Avatar for app messages (left side) */}
            {!isUser && showAvatar && (
                <div className="mr-3 flex-shrink-0">
                    <Avatar type="app" />
                </div>
            )}

            {/* Message bubble container */}
            <div className={`relative max-w-[70%] ${isUser ? 'mr-3' : 'ml-0'}`}>
                {/* Triangle Arrow */}
                <div
                    className={`absolute top-3 w-0 h-0 border-y-[6px] border-y-transparent 
            ${isUser
                            ? '-right-[6px] border-l-[6px] border-l-[var(--color-secondary)]'
                            : '-left-[6px] border-r-[6px] border-r-white'
                        }`}
                ></div>

                {/* Bubble Content */}
                <div
                    className={`rounded-[6px] p-3 shadow-sm ${isUser
                        ? 'bg-[var(--color-secondary)] text-[var(--color-black)]'
                        : 'bg-white text-[var(--color-black)] border border-transparent' // Removed neumorphic border
                        }`}
                >
                    <p className="text-base font-normal leading-snug break-words">{text}</p>
                </div>
            </div>

            {/* Avatar for user messages (right side) */}
            {isUser && showAvatar && (
                <div className="ml-0 flex-shrink-0">
                    <Avatar type="user" />
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
