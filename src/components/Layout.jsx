import { Outlet } from 'react-router-dom';
import WordTestNavBar from './WordTestNavBar';

function Layout() {
  return (
    // The main container for the application layout.
    // It uses a flex column layout to structure the main content and the navigation bar.
    // The `main-container-style` class applies a consistent inner shadow to the top of the app.
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 pt-4 gap-2 overflow-y-auto main-container-style">
      {/* Main content area. pb-20 prevents content from hiding behind fixed nav bar. */}
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      {/* Fixed wrapper keeps nav bar at bottom of viewport when scrolling. */}
      <div className="fixed bottom-0 left-0 right-0 px-4">
        <WordTestNavBar />
      </div>
    </div>
  );
}

export default Layout;
