import { useEffect } from 'react'; // Import useEffect
import WordTestTimer from '../components/WordTestTimer';
// import WordTestStats from '../components/WordTestStats';
import WordTestCardGallery from '../components/WordTestCardGallery';
import { TimerProvider } from '../contexts/TimerContext'; // Import timer context provider

function WordTest() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Setting returnValue to a non-empty string triggers the browser's generic warning.
      event.returnValue = ' '; // A non-empty string to trigger the warning
      // No custom message is returned, as modern browsers ignore it.
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  return (
    // Wrap entire WordTest content with TimerProvider to enable 3-minute countdown
    <TimerProvider>
      <WordTestTimer />
      {/* <WordTestStats /> */}
      {/* Gallery wrapper div - py-8 adds 32px padding */}
      <div className="flex-grow flex justify-center py-0 mt-8">
        <div className="w-screen ml-[-1rem] mr-[-1rem]">
          <WordTestCardGallery />
        </div>
      </div>
    </TimerProvider>
  );
}

export default WordTest;
