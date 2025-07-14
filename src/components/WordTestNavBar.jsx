import { NavLink } from 'react-router-dom';

function WordTestNavBar() {
  const activeStyle = {
    filter: 'brightness(0) invert(1)',
  };

  return (
    <div className="flex justify-around items-center h-13 w-[var(--content-width)] mx-auto bg-[var(--color-secondary)] rounded-full shadow-lg">
      <NavLink to="/" className="p-2" style={({ isActive }) => isActive ? activeStyle : undefined}>
        <img src="/WordTestNavBar_HomeButton.svg" alt="Home" className="w-6 h-6" />
      </NavLink>
      <NavLink to="/write" className="p-2" style={({ isActive }) => isActive ? activeStyle : undefined}>
        <img src="/WordTestNavBar_WordCardButton.svg" alt="Write" className="w-6 h-6" />
      </NavLink>
      <NavLink to="/profile" className="p-2" style={({ isActive }) => isActive ? activeStyle : undefined}>
        <img src="/WordTestNavBar_UserProfileButton.svg" alt="Profile" className="w-6 h-6" />
      </NavLink>
    </div>
  );
}

export default WordTestNavBar;
