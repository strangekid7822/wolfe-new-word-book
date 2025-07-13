function WordTestWordCard({ wordLength = 6, cardData = {} }) {
  return (
    <div className="bg-[var(--color-white)] p-6 rounded-3xl shadow-lg text-center w-full mx-auto min-h-[50vh] flex flex-col justify-between">
      {/* Play Button */}
      <img src="/WordTestWordCard_PlayButton_Clean.svg" alt="Play" className="w-14 h-14 mx-auto cursor-pointer hover:scale-105 transition-transform" />
      
      {/* Chinese Prompt */}
      <p className="text-[var(--color-primary)] text-lg font-medium">根据读音拼写单词:</p>
      
      {/* Character Input Boxes */}
      <div className="flex justify-center gap-1">
        {[...Array(wordLength)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-8 h-10 sm:w-7 sm:h-9 rounded-lg text-center text-base font-medium bg-[var(--color-tertiary)] focus:outline-none"
            style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)' }}
          />
        ))}
      </div>
      
      {/* Confirm Button */}
      <button className="bg-[var(--color-secondary)] text-[var(--color-black)] px-8 py-3 rounded-full text-base font-medium hover:bg-[var(--color-secondary-2)] transition-colors shadow-md w-full mx-auto">
        确定
      </button>
    </div>
  );
}

export default WordTestWordCard;
