import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WordTest from './pages/WordTest';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';

/**
 * WelcomeRedirect - Checks if user has visited before
 * First-time users go to Welcome page, returning users go to Home
 */
function WelcomeRedirect() {
  const hasVisited = localStorage.getItem('hasVisitedBefore');
  return hasVisited ? <Navigate to="/home" replace /> : <Navigate to="/welcome" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path redirects based on first-time visit status */}
        <Route path="/" element={<WelcomeRedirect />} />

        {/* Welcome page for new users */}
        <Route path="/welcome" element={<Welcome />} />

        {/* Main app routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="write" element={<WordTest />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
