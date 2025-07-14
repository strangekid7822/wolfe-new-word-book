import { Outlet } from 'react-router-dom';
import WordTestNavBar from './WordTestNavBar';

function Layout() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-tertiary)] px-4 pt-16 pb-6 gap-2 overflow-y-hidden">
      <main className="flex-grow">
        <Outlet />
      </main>
      <WordTestNavBar />
    </div>
  );
}

export default Layout;
