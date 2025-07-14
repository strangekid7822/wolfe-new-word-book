function WordTestStats() {
  return (
    <div className="flex justify-between items-center py-2 px-2 w-[var(--content-width)] mx-auto">
      <span className="text-[var(--color-green)] text-base font-medium">正确: 5</span>
      <span className="text-[var(--color-orange)] text-base font-medium">错误: 2</span>
      <span className="text-[var(--color-black)] text-base font-medium">正确率: 71%</span>
    </div>
  );
}

export default WordTestStats;