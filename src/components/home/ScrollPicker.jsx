import { useState, useRef, useEffect } from 'react';

/**
 * ScrollPicker - Vertical scroll picker with snap-to-center selection.
 * Shows center item selected with partial adjacent items visible as scroll hints.
 * @param {Array} options - Array of { label, value } objects
 * @param {Function} onSelect - Callback when Send is clicked
 * @param {string} defaultValue - Optional default selected value
 */
const ScrollPicker = ({ options, onSelect, defaultValue }) => {
    const [selectedIndex, setSelectedIndex] = useState(() => {
        if (!defaultValue) return 0;
        const index = options.findIndex(opt => opt.value === defaultValue);
        return index >= 0 ? index : 0;
    });
    const [isReady, setIsReady] = useState(false);
    const scrollContainerRef = useRef(null);

    const itemHeight = 28; // Compact row height - tighter spacing
    const containerHeight = 84; // Fixed container height

    // Initial scroll to selected index (center it)
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            // Scroll so selected item is centered
            const scrollTop = selectedIndex * itemHeight;
            container.scrollTop = scrollTop;
            requestAnimationFrame(() => setIsReady(true));
        }
    }, []);

    const handleScroll = (e) => {
        const container = e.target;
        // Calculate which item is at visual center
        // scrollTop directly maps to item index since padding offsets the first item to center
        const newIndex = Math.round(container.scrollTop / itemHeight);
        const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex));
        if (clampedIndex !== selectedIndex) {
            setSelectedIndex(clampedIndex);
        }
    };

    const handleItemClick = (index) => {
        if (scrollContainerRef.current) {
            const scrollTop = index * itemHeight;
            scrollContainerRef.current.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    };

    const handleSend = () => {
        const selectedOption = options[selectedIndex];
        if (selectedOption) {
            onSelect(selectedOption.label);
        }
    };

    // Padding allows first/last items to reach container center
    const paddingHeight = (containerHeight - itemHeight) / 2;

    return (
        <div className="flex w-full items-center justify-center h-full">
            <div className="relative w-full max-w-md" style={{ height: `${containerHeight}px` }}>

                {/* Main Container */}
                <div className="absolute inset-0 w-full rounded-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] border border-[var(--color-white)] overflow-hidden flex items-center">

                    {/* Scroll Area - Vertical, clips right side for button */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory hide-scrollbar h-full"
                        style={{
                            scrollBehavior: isReady ? 'smooth' : 'auto',
                            // Only clip right side for button area
                            clipPath: 'inset(0 4.5rem 0 0)'
                        }}
                        onScroll={handleScroll}
                    >
                        {/* Top padding */}
                        <div style={{ height: `${paddingHeight}px` }} />

                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`snap-center flex items-center justify-center cursor-pointer transition-all duration-300 whitespace-nowrap text-base ${selectedIndex === index
                                    ? 'text-[var(--color-black)]'
                                    : 'text-gray-400'
                                    }`}
                                style={{ height: `${itemHeight}px` }}
                                onClick={() => handleItemClick(index)}
                            >
                                {option.label}
                            </div>
                        ))}

                        {/* Bottom padding */}
                        <div style={{ height: `${paddingHeight}px` }} />
                    </div>

                </div>

                {/* Send Button - Same size as original, vertically centered */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                    <button
                        onClick={handleSend}
                        className="btn-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center active:scale-95 transition-transform"
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScrollPicker;
