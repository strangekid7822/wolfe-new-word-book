function WordTestNavBar() {
  return (
    <div className="flex justify-around items-center p-4 bg-secondary rounded-full shadow-lg">
      <a href="/" className="text-[var(--color-black)]">Home</a>
      <a href="/write" className="text-[var(--color-primary)] font-bold">Write</a>
      <a href="/profile" className="text-[var(--color-black)]">Profile</a>
    </div>
  );
}

export default WordTestNavBar;
