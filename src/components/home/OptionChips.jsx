/**
 * OptionChips component
 * Displays a set of option buttons for user selection.
 */
const OptionChips = ({ options, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-end">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option.label)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-[2px_2px_5px_var(--color-shadow)] transition-all active:scale-95 border border-[var(--color-white)] hover:bg-[var(--color-tertiary)]"
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default OptionChips;
