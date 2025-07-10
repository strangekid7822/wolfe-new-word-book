function WordTestWordCard() {
  return (
    <div className="bg-[var(--color-white)] p-8 rounded-3xl shadow-lg text-center max-w-md mx-auto min-h-[50vh] flex flex-col justify-between">
      {/* Play Button */}
      <img src="/WordTestWordCard_PlayButton_Clean.svg" alt="Play" className="w-16 h-16 mx-auto cursor-pointer hover:scale-105 transition-transform" />
      
      {/* Chinese Prompt */}
      <p className="text-[var(--color-primary)] text-xl font-medium">根据读音拼写单词:</p>
      
      {/* Character Input Boxes */}
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-8 h-10 rounded-lg text-center text-lg font-medium bg-[var(--color-tertiary)] focus:outline-none"
            style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)' }}
          />
        ))}
      </div>
      
      {/* Confirm Button */}
      <button className="bg-[var(--color-secondary)] text-[var(--color-black)] px-12 py-3 rounded-full text-lg font-medium hover:bg-[var(--color-secondary-2)] transition-colors shadow-md">
        确定
      </button>
    </div>
  );
}

export default WordTestWordCard;
