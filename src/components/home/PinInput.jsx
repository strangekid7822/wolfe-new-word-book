import { useState, useRef, useEffect } from 'react';

/**
 * PinInput component
 * 6-digit PIN input with individual boxes and a send button.
 * When complete, inputs compress left with animation to reveal send button.
 */
const PinInput = ({ onSubmit, length = 6 }) => {
    const [values, setValues] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        // Only allow single digit
        if (value.length > 1) {
            value = value.slice(-1);
        }
        // Only allow numbers
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        // Auto-focus next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace - move to previous input
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const pin = values.join('');
        if (pin.length === length) {
            onSubmit(pin);
        }
    };

    const isComplete = values.every(v => v !== '');

    return (
        // Fixed width container to keep total width constant
        <div className="flex items-center justify-center w-full max-w-xs mx-auto">
            <div className="flex items-center justify-center transition-all duration-300 ease-out">
                {/* PIN Input Boxes - width and gap shrink when complete */}
                <div
                    className={`flex transition-all duration-300 ease-out ${isComplete ? 'gap-1' : 'gap-2'
                        }`}
                >
                    {values.map((value, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="tel"
                            inputMode="numeric"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={1}
                            className={`h-12 text-center text-base font-bold rounded-xl bg-white text-[var(--color-black)] border-2 border-[var(--color-grey)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all ${isComplete ? 'w-8' : 'w-10'
                                }`}
                        />
                    ))}
                </div>

                {/* Send Button - slides in from right when complete */}
                <div
                    className={`transition-all duration-300 ease-out overflow-hidden ${isComplete ? 'w-20 ml-2 opacity-100' : 'w-0 ml-0 opacity-0'
                        }`}
                >
                    <button
                        onClick={handleSubmit}
                        className="glass-effect !w-full h-12 text-white text-sm font-bold rounded-full shadow-md whitespace-nowrap"
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PinInput;
