import WordTestTimer from '../components/WordTestTimer';
import WordTestWordCard from '../components/WordTestWordCard';
import WordTestNavBar from '../components/WordTestNavBar';

function WordTest() {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-tertiary)]">
      <header className="fixed top-0 w-full px-4 pt-2">
        <WordTestTimer />
      </header>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full">
            <WordTestWordCard />
        </div>
      </main>
      <footer className="fixed bottom-0 w-full px-4 pb-4">
        <WordTestNavBar />
      </footer>
    </div>
  );
}

export default WordTest;
