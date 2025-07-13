import WordTestTimer from '../components/WordTestTimer';
import WordTestStats from '../components/WordTestStats';
import WordTestCardGallery from '../components/WordTestCardGallery';
import WordTestNavBar from '../components/WordTestNavBar';

function WordTest() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 pt-16 pb-6 gap-2 overflow-y-hidden" style={{ touchAction: 'pan-x' }}>
      <WordTestTimer />
      <WordTestStats />
      {/* Gallery wrapper div - py-8 adds 32px padding */}
      <div className="flex-grow flex justify-center py-0">
        <div className="w-screen ml-[-1rem] mr-[-1rem]">
          <WordTestCardGallery />
        </div>
      </div>
      <WordTestNavBar />
    </div>
  );
}

export default WordTest;
