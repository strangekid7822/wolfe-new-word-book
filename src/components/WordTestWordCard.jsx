function WordTestWordCard() {
  return (
    <div className="bg-[var(--color-white)] p-8 rounded-3xl shadow-lg text-center max-w-md mx-auto">
      {/* Play Button */}
      <div className="mb-6">
        <img src="/WordTestWordCard_PlayButton.svg" alt="Play" className="w-16 h-16 mx-auto cursor-pointer hover:scale-105 transition-transform" />
      </div>
      
      {/* Chinese Prompt */}
      <p className="text-[var(--color-primary)] text-xl font-medium mb-8">根据读音拼写单词:</p>
      
      {/* Character Input Boxes */}
      <div className="flex justify-center gap-2 mb-8">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 border-2 border-[var(--color-grey)] rounded-lg text-center text-lg font-medium bg-[var(--color-white)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        ))}
      </div>
      
      {/* Confirm Button */}
      <button className="bg-[var(--color-secondary)] text-[var(--color-black)] px-12 py-3 rounded-full text-lg font-medium hover:bg-[var(--color-secondary-2)] transition-colors">
        确定
      </button>
    </div>
  );
}

export default WordTestWordCard;
