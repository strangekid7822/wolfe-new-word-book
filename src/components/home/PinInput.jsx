import { useState, useRef, useEffect } from 'react';

/**
 * PinInput component
 * 6-digit PIN input with individual boxes and a send button.
 * Styled to match homepage glassmorphism aesthetic.
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
        <div className="flex flex-col items-center gap-4 w-full">
            {/* PIN Input Boxes */}
            <div className="flex gap-2 justify-center">
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
                        className="w-10 h-12 text-center text-xl font-bold rounded-xl bg-white text-[var(--color-black)] border-2 border-[var(--color-grey)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
                    />
                ))}
            </div>

            {/* Send Button - appears when all 6 digits filled */}
            <div
                className={`transition-all duration-300 ease-out transform origin-center ${isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
                    }`}
            >
                <button
                    onClick={handleSubmit}
                    className="glass-effect !w-auto text-white text-sm font-bold px-6 py-2 rounded-full shadow-md"
                >
                    发送
                </button>
            </div>
        </div>
    );
};

export default PinInput;
