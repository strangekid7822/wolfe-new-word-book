function WordTestNavBar() {
  return (
    <div className="flex justify-around items-center p-4 bg-[var(--color-secondary)] rounded-full shadow-lg">
      <a href="/" className="p-2">
        <img src="/WordTestNavBar_HomeButton.svg" alt="Home" className="w-6 h-6" />
      </a>
      <a href="/write" className="p-2">
        <img src="/WordTestNavBar_WordCardButton.svg" alt="Write" className="w-6 h-6" />
      </a>
      <a href="/profile" className="p-2">
        <img src="/WordTestNavBar_UserProfileButton.svg" alt="Profile" className="w-6 h-6" />
      </a>
    </div>
  );
}

export default WordTestNavBar;
