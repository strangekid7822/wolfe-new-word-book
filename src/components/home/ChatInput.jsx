import { useState } from 'react';

/**
 * ChatInput component
 * A simple text input field centered within its container.
 */
const ChatInput = ({ placeholder, onSend }) => {
    const [value, setValue] = useState('');

    const handleSend = () => {
        if (value.trim()) {
            onSend(value.trim());
            setValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex w-full items-center justify-center h-full">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder || "Type a message..."}
                    className="w-full rounded-full bg-white pl-4 pr-16 py-3 text-sm text-[var(--color-black)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] border border-[var(--color-white)] text-center transition-all"
                    onKeyDown={handleKeyDown}
                    autoFocus
                />

                {/* Send Button */}
                <div
                    className={`absolute right-1 top-1 bottom-1 flex items-center justify-center transition-all duration-300 ease-out transform origin-center ${value.trim() ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
                        }`}
                >
                    <button
                        onClick={handleSend}
                        className="glass-effect !bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md h-full flex items-center"
                        style={{ width: 'auto', height: '100%' }} // Override glass-effect fixed height/width
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
