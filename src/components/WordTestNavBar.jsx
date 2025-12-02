import { NavLink, useLocation } from 'react-router-dom';

function WordTestNavBar() {
  const location = useLocation();

  // Get appropriate SVG file based on active state
  const getIconSrc = (baseName, isActive) => {
    return isActive
      ? `/WordTestNavBar_${baseName}.svg`         // Filled/solid (active)
      : `/WordTestNavBar_${baseName}_active.svg`; // Outline (inactive)
  };

  const handleNavClick = (e, to) => {
    if (location.pathname === '/write' && to !== '/write') {
      // Check DOM for any filled inputs
      const inputs = document.querySelectorAll('input[type="text"]');
      const hasAnswers = Array.from(inputs).some(input => input.value.trim() !== '');

      if (hasAnswers) {
        e.preventDefault();
        const proceed = window.confirm("你确定要离开吗？亲爱哒。");
        if (proceed) {
          window.location.href = to;
        }
      }
    }
  };

  return (
    <div className="flex justify-around items-center h-14 w-[var(--content-width)] mx-auto nav-bar-style">
      <NavLink
        to="/"
        className="p-2"
        onClick={(e) => handleNavClick(e, '/')}
      >
        {({ isActive }) => (
          <img
            src={getIconSrc('HomeButton', isActive)}
            alt="Home"
            className="w-8 h-8"
          />
        )}
      </NavLink>
      <NavLink
        to="/write"
        className="p-2"
        onClick={(e) => handleNavClick(e, '/write')}
      >
        {({ isActive }) => (
          <img
            src={getIconSrc('WordCardButton', isActive)}
            alt="Write"
            className="w-8 h-8"
          />
        )}
      </NavLink>
      <NavLink
        to="/profile"
        className="p-2"
        onClick={(e) => handleNavClick(e, '/profile')}
      >
        {({ isActive }) => (
          <img
            src={isActive ? '/WordTestNavBar_Compass_active.svg' : '/WordTestNavBar_Compass_inactive.svg'}
            alt="Discover"
            className="w-8 h-8"
          />
        )}
      </NavLink>
    </div>
  );
}

export default WordTestNavBar;
