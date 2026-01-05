import { useState, useRef, useEffect } from 'react';

/**
 * ScrollPicker component
 * A horizontally scrollable picker that mimics the visual style of ChatInput.
 * @param {Array} options - Array of objects { label, value }
 * @param {Function} onSelect - Callback when "Send" is clicked with selected value
 */
const ScrollPicker = ({ options, onSelect, defaultValue }) => {
    const [selectedIndex, setSelectedIndex] = useState(() => {
        if (!defaultValue) return 0;
        const index = options.findIndex(opt => opt.value === defaultValue);
        return index >= 0 ? index : 0;
    });
    const [isReady, setIsReady] = useState(false);
    const scrollContainerRef = useRef(null);

    // Initial scroll to selected index
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const selectedElement = container.children[selectedIndex];
            if (selectedElement) {
                // Determine scrolling logic to center the element
                // We typically need to wait for layout, but in this simple case it might work immediately or require a small timeout
                // Using requestAnimationFrame to ensure layout is ready
                requestAnimationFrame(() => {
                    // Calculating center manually or using scrollIntoView
                    // scrollIntoView is easier but might need 'inline: center'
                    selectedElement.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
                    // Enable smooth scrolling after initial positioning
                    requestAnimationFrame(() => setIsReady(true));
                });
            } else {
                setIsReady(true);
            }
        }
    }, []); // Run once on mount (dependency empty to run only once, strictly speaking selectedIndex is stable from init)

    const handleSend = () => {
        const selectedOption = options[selectedIndex];
        if (selectedOption) {
            onSelect(selectedOption.label); // Returning label as per current Home.jsx logic which expects text input
        }
    };

    return (
        <div className="flex w-full items-center justify-center h-full">
            <div className="relative w-full max-w-md h-[50px]"> {/* Fixed height matching typical input */}

                {/* Main Container mimicking Input */}
                <div className="absolute inset-0 w-full rounded-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] border border-[var(--color-white)] overflow-hidden flex items-center">

                    {/* Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center px-[40%] w-full h-full"
                        style={{
                            scrollBehavior: isReady ? 'smooth' : 'auto',
                            clipPath: 'inset(0 4.5rem 0 0)' // Clip the right side where the button is
                        }}
                        onScroll={(e) => {
                            const container = e.target;
                            const center = container.scrollLeft + container.clientWidth / 2;
                            const items = container.children;

                            let closestDist = Infinity;
                            let closestIndex = 0;

                            for (let i = 0; i < items.length; i++) {
                                const item = items[i];
                                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                                const dist = Math.abs(center - itemCenter);
                                if (dist < closestDist) {
                                    closestDist = dist;
                                    closestIndex = i;
                                }
                            }
                            setSelectedIndex(closestIndex);
                        }}
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`snap-center flex-shrink-0 px-4 py-2 transition-all duration-300 whitespace-nowrap cursor-pointer text-base ${selectedIndex === index
                                    ? 'text-[var(--color-black)] opacity-100'
                                    : 'text-gray-400 opacity-100'
                                    }`}
                                onClick={(e) => {
                                    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Send Button - Always Visible as requested */}
                <div className="absolute right-1 top-1 bottom-1 flex items-center justify-center z-10">
                    <button
                        onClick={handleSend}
                        className="glass-effect text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md h-full flex items-center active:scale-95 transition-transform"
                        style={{ width: 'auto', height: '100%' }}
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScrollPicker;
