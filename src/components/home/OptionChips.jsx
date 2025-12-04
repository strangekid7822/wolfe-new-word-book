/**
 * OptionChips component
 * Displays a set of option buttons for user selection.
 */
const OptionChips = ({ options, onSelect }) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option.label)}
                    className="glass-effect !h-10 !w-full text-[var(--color-white)] text-sm font-semibold active:scale-95 rounded-full"
                    style={{ height: '3rem' }} // Explicit height override
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default OptionChips;
