import WordTestTimer from '../components/WordTestTimer';
import WordTestStats from '../components/WordTestStats';
import WordTestCardGallery from '../components/WordTestCardGallery';
import WordTestNavBar from '../components/WordTestNavBar';

function WordTest() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 py-6 overflow-y-hidden" style={{ touchAction: 'pan-x' }}>
      <WordTestTimer />
      <WordTestStats />
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="w-screen ml-[-1rem] mr-[-1rem]">
          <WordTestCardGallery />
        </div>
      </div>
      <WordTestNavBar />
    </div>
  );
}

export default WordTest;
