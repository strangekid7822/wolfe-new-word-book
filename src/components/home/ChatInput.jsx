import { useState } from 'react';

/**
 * ChatInput component
 * A simple text input field centered within its container.
 */
const ChatInput = ({ placeholder, onSend }) => {
    const [value, setValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && value.trim()) {
            onSend(value.trim());
            setValue('');
        }
    };

    return (
        <div className="flex w-full items-center justify-center h-full">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Type a message..."}
                className="w-full max-w-md rounded-full bg-white px-4 py-3 text-sm text-[var(--color-black)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] border border-[var(--color-white)] text-center"
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    );
};

export default ChatInput;
