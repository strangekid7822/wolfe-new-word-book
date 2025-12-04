import { useEffect, useState } from 'react';

/**
 * InputAreaWrapper component
 * A fixed bottom container that slides up when visible.
 * Used to hold ChatInput or OptionChips.
 */
const InputAreaWrapper = ({ children, visible = false }) => {
    const [shouldRender, setShouldRender] = useState(visible);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
            // Small delay to allow DOM to mount before starting animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true);
                });
            });
        } else {
            setAnimateIn(false);
            // Delay unmounting to allow animation to finish
            const timer = setTimeout(() => setShouldRender(false), 450);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-tertiary)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4 transition-transform duration-500 ease-out z-50 ${animateIn ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default InputAreaWrapper;
