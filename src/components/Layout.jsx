import { Outlet } from 'react-router-dom';
import WordTestNavBar from './WordTestNavBar';

function Layout() {
  return (
    // The main container for the application layout.
    // It uses a flex column layout to structure the main content and the navigation bar.
    // The `main-container-style` class applies a consistent inner shadow to the top of the app.
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 pt-6 pb-6 gap-2 overflow-y-hidden main-container-style">
      <main className="flex-grow">
        <Outlet />
      </main>
      <WordTestNavBar />
    </div>
  );
}

export default Layout;
