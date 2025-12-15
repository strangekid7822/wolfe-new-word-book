/**
 * OptionChips component
 * Displays a set of option buttons for user selection.
 * Supports 'list' (default) and 'grid' layouts.
 */
const OptionChips = ({ options, onSelect, layout = 'list' }) => {
    const isGrid = layout === 'grid';

    return (
        <div className={
            isGrid
                ? "flex flex-wrap gap-2 w-full justify-center"
                : "flex flex-col gap-3 w-full"
        }>
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option.label)}
                    className={
                        isGrid
                            // !w-auto overrides glass-effect's width:100% to allow flex-wrap
                            ? "glass-effect !w-auto text-[var(--color-white)] text-sm font-semibold active:scale-95 rounded-full px-4 py-2"
                            : "glass-effect !h-10 !w-full text-[var(--color-white)] text-sm font-semibold active:scale-95 rounded-full"
                    }
                    style={isGrid ? {} : { height: '3rem' }}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default OptionChips;
