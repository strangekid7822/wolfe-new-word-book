import { useEffect, useState } from 'react';

/**
 * InputAreaWrapper component
 * A fixed bottom container that slides up when visible.
 * Used to hold ChatInput or OptionChips.
 */
const InputAreaWrapper = ({ children, visible = false }) => {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        } else {
            // Delay unmounting to allow animation to finish
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-tertiary)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4 transition-transform duration-300 ease-out z-50 ${visible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default InputAreaWrapper;
