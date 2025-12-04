/**
 * Avatar component
 * Displays app or user avatar icon
 */
const Avatar = ({ type = 'app', src }) => {
    if (src) {
        // Custom image
        return (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                <img src={src} alt={`${type} avatar`} className="w-full h-full object-cover" />
            </div>
        );
    }

    // Default icons
    if (type === 'app') {
        return (
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
        );
    }

    // User avatar
    return (
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-1">
            <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.478 29.1075C30.306 28.935 30.801 28.068 30.3885 27.327C29.4795 25.6965 28.0485 24.2625 26.2185 23.1705C23.8605 21.7635 20.97 21 18 21C15.03 21 12.1395 21.762 9.78151 23.1705C7.95151 24.2625 6.52051 25.6965 5.61151 27.327C5.19901 28.068 5.69401 28.935 6.52201 29.1075C14.0922 30.6853 21.9063 30.6853 29.4765 29.1075" fill="var(--color-primary)" />
                <path d="M18 19.5C22.1421 19.5 25.5 16.1421 25.5 12C25.5 7.85786 22.1421 4.5 18 4.5C13.8579 4.5 10.5 7.85786 10.5 12C10.5 16.1421 13.8579 19.5 18 19.5Z" fill="var(--color-primary)" />
            </svg>
        </div>
    );
};

export default Avatar;
