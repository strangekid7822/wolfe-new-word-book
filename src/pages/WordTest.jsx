import WordTestTimer from '../components/WordTestTimer';
import WordTestStats from '../components/WordTestStats';
import WordTestCardGallery from '../components/WordTestCardGallery';

function WordTest() {
  return (
    <>
      <WordTestTimer />
      <WordTestStats />
      {/* Gallery wrapper div - py-8 adds 32px padding */}
      <div className="flex-grow flex justify-center py-0 mt-4">
        <div className="w-screen ml-[-1rem] mr-[-1rem]">
          <WordTestCardGallery />
        </div>
      </div>
    </>
  );
}

export default WordTest;
