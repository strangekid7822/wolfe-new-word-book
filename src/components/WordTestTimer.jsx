function WordTestTimer() {
  return (
    <div className="flex justify-center">
      <div className="bg-[var(--color-white)] rounded-full p-1 w-64 shadow-[var(--shadow-timer)]  w-[var(--content-width-2)]">
        <div className="bg-[var(--color-white)] rounded-full h-2.5">
          <div className="bg-[var(--color-secondary)] h-2.5 rounded-full ml-auto" style={{ width: "45%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default WordTestTimer;
