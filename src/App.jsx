import { useEffect } from 'react';
import WordTest from './pages/WordTest';

function App() {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
  }, []);

  return (
    <div className="min-h-[var(--app-height)]">
      <WordTest />
    </div>
  );
}

export default App;
