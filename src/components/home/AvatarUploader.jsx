import { useRef } from 'react';

/**
 * AvatarUploader component
 * A styled button that triggers photo selection, matching OptionChips style.
 */
const AvatarUploader = ({ onUpload, buttonText = "📷 上传头像" }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Convert to base64 for localStorage storage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                localStorage.setItem('userAvatar', base64);
                onUpload(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {/* Styled button matching OptionChips */}
            <button
                onClick={handleClick}
                className="glass-effect !h-10 !w-full text-[var(--color-white)] text-sm font-semibold active:scale-95 rounded-full flex items-center justify-center gap-2"
                style={{ height: '3rem' }}
            >
                <img src="/HomePageInputWrapper_CameraIcon.svg" alt="camera" className="w-5 h-5" />
                <span>上传头像</span>
            </button>
        </div>
    );
};

export default AvatarUploader;
