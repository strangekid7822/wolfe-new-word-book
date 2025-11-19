import { Link } from 'react-router-dom';

function Home() {
  // Mock data for the dashboard
  const stats = [
    { label: 'Words Learned', value: '124', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { label: 'Day Streak', value: '7', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    )},
    { label: 'Accuracy', value: '92%', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )}
  ];

  return (
    <div className="flex flex-col gap-6 pb-20 animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col gap-1 mt-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Hello, Learner!
        </h1>
        <p className="text-[var(--color-grey-darker)] text-lg">
          Ready to expand your vocabulary today?
        </p>
      </header>

      {/* Main Action Card - Start Test */}
      <Link to="/write" className="block group">
        <div className="relative overflow-hidden rounded-[30px] bg-[var(--color-primary)] p-6 text-white shadow-lg transition-transform duration-300 active:scale-95">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">Start Word Test</span>
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-blue-100">Challenge yourself with a 3-minute spelling test.</p>
          </div>
          
          {/* Decorative background circles */}
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        </div>
      </Link>

      {/* Stats Grid */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[var(--color-grey-darker)]">Your Progress</h2>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-2 rounded-[20px] bg-[var(--color-tertiary)] p-3 py-4 text-center shadow-[5px_5px_10px_var(--color-shadow)] border border-[var(--color-white)]">
              <div className="text-[var(--color-primary)]">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[var(--color-black)]">{stat.value}</span>
                <span className="text-xs font-medium text-[var(--color-grey-darker)]">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Word / Tip Section */}
      <section className="flex-1">
        <h2 className="mb-4 text-xl font-bold text-[var(--color-grey-darker)]">Daily Vibe</h2>
        <div className="relative overflow-hidden rounded-[30px] bg-[var(--color-tertiary)] p-6 shadow-[8px_8px_16px_var(--color-shadow)] border-2 border-[var(--color-white)]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[var(--color-secondary-2)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">
                Word of the Day
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-black)]">Serendipity</h3>
              <p className="text-sm text-[var(--color-grey-darker)]">/ˌser.ənˈdɪp.ə.t̬i/</p>
            </div>
            <p className="text-[var(--color-grey-darker)] italic">
              "The occurrence and development of events by chance in a happy or beneficial way."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
