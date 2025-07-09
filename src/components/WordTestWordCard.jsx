function WordTestWordCard() {
  return (
    <div className="w-full bg-[var(--color-grey)] p-6 rounded-lg shadow-lg text-center">
      <button className="text-3xl mb-4">▶️</button>
      <p className="text-lg mb-4 text-[var(--color-black)]">怎么拼?</p>
      <input type="text" className="border-2 border-[var(--color-grey)] p-2 rounded-lg w-full bg-[var(--color-white)] text-[var(--color-black)]" />
    </div>
  );
}

export default WordTestWordCard;
