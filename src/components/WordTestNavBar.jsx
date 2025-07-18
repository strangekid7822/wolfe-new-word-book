import { NavLink, useLocation } from 'react-router-dom';

function WordTestNavBar() {
  const location = useLocation();
  
  const activeStyle = {
    filter: 'brightness(0) invert(1)',
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
    <div className="flex justify-around items-center h-13 w-[var(--content-width)] mx-auto bg-[var(--color-secondary)] rounded-full shadow-lg">
      <NavLink 
        to="/" 
        className="p-2" 
        style={({ isActive }) => isActive ? activeStyle : undefined}
        onClick={(e) => handleNavClick(e, '/')}
      >
        <img src="/WordTestNavBar_HomeButton.svg" alt="Home" className="w-6 h-6" />
      </NavLink>
      <NavLink 
        to="/write" 
        className="p-2" 
        style={({ isActive }) => isActive ? activeStyle : undefined}
        onClick={(e) => handleNavClick(e, '/write')}
      >
        <img src="/WordTestNavBar_WordCardButton.svg" alt="Write" className="w-6 h-6" />
      </NavLink>
      <NavLink 
        to="/profile" 
        className="p-2" 
        style={({ isActive }) => isActive ? activeStyle : undefined}
        onClick={(e) => handleNavClick(e, '/profile')}
      >
        <img src="/WordTestNavBar_UserProfileButton.svg" alt="Profile" className="w-6 h-6" />
      </NavLink>
    </div>
  );
}

export default WordTestNavBar;
