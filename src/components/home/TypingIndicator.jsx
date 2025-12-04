import Avatar from './Avatar';

/**
 * TypingIndicator component
 * Displays an animated typing indicator in a WeChat-style bubble
 */
const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="mr-3 flex-shrink-0">
                <Avatar type="app" />
            </div>

            <div className="relative ml-0">
                {/* Triangle Arrow */}
                <div className="absolute top-3 -left-[6px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white"></div>

                {/* Bubble Content */}
                <div className="bg-white rounded-[12px] p-4 shadow-sm">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[var(--color-grey)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[var(--color-grey)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[var(--color-grey)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
