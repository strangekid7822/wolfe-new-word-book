import WordTestTimer from '../components/WordTestTimer';
import WordTestWordCard from '../components/WordTestWordCard';
import WordTestNavBar from '../components/WordTestNavBar';

function WordTest() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-tertiary)] px-4 py-6">
      <WordTestTimer />
      <div className="flex-grow flex items-center justify-center py-8">
        <WordTestWordCard />
      </div>
      <WordTestNavBar />
    </div>
  );
}

export default WordTest;
