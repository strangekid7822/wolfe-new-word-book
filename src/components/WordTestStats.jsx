function WordTestStats() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-around py-2 px-4 w-64">
        <span className="text-[var(--color-primary)] text-sm font-medium">正确: 5</span>
        <span className="text-[var(--color-orange)] text-sm font-medium">错误: 2</span>
        <span className="text-[var(--color-black)] text-sm font-medium">正确率: 71%</span>
      </div>
    </div>
  );
}

export default WordTestStats;