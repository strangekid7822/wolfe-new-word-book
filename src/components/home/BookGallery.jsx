import { useState, useRef, useEffect } from 'react';

/**
 * BookGallery component
 * Horizontal scrollable gallery showing book covers with titles
 * @param {Array} books - Array of { cover, title, value }
 * @param {Function} onSelect - Callback when a book is selected
 */
const BookGallery = ({ books, onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const handleSelect = () => {
        const selectedBook = books[selectedIndex];
        if (selectedBook) {
            onSelect(selectedBook.title);
        }
    };

    return (
        <div className="flex flex-col w-full items-center gap-3">
            {/* Book covers scroll area */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 py-2 w-full"
                style={{ scrollBehavior: 'smooth' }}
                onScroll={(e) => {
                    const container = e.target;
                    const center = container.scrollLeft + container.clientWidth / 2;
                    const items = Array.from(container.children).filter(el => !el.dataset.spacer);

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
                {/* Left spacer - allows first item to center */}
                <div data-spacer="true" className="flex-shrink-0" style={{ width: 'calc(50% - 48px)' }} />

                {books.map((book, index) => (
                    <div
                        key={index}
                        className={`snap-center flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${selectedIndex === index
                            ? 'scale-105 opacity-100'
                            : 'scale-95 opacity-60'
                            }`}
                        onClick={(e) => {
                            e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                        }}
                    >
                        {/* Book cover image */}
                        <div className="w-24 h-32 rounded-lg overflow-hidden shadow-md bg-white">
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Book title */}
                        <span className={`text-sm text-center max-w-24 leading-tight ${selectedIndex === index
                            ? 'text-[var(--color-black)] font-medium'
                            : 'text-gray-400'
                            }`}>
                            {book.title}
                        </span>
                    </div>
                ))}

                {/* Right spacer - allows last item to center */}
                <div data-spacer="true" className="flex-shrink-0" style={{ width: 'calc(50% - 48px)' }} />
            </div>

            {/* Select button */}
            <button
                onClick={handleSelect}
                className="btn-primary text-white text-sm font-bold px-6 py-2 rounded-full shadow-md active:scale-95 transition-transform"
            >
                选这本
            </button>
        </div>
    );
};

export default BookGallery;
