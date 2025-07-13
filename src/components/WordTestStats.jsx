function WordTestStats() {
  return (
    <div className="flex justify-between items-center py-2 px-4 mx-9">
      <span className="text-[var(--color-primary)] text-sm font-medium">正确: 5</span>
      <span className="text-[var(--color-orange)] text-sm font-medium">错误: 2</span>
      <span className="text-[var(--color-black)] text-sm font-medium">正确率: 71%</span>
    </div>
  );
}

export default WordTestStats;