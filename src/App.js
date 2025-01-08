import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CurrentConditions from './components/CurrentConditions';
import Plots from './components/Plots';
import SplashScreen from './components/SplashScreen';
import WeatherQuotes from './components/WeatherQuotes'; // Import WeatherQuotes
import { useTheme } from './context/ThemeContext';
import { PlotsProvider } from './context/PlotsContext'; // Import PlotsProvider

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Show splash screen for 5 seconds
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <PlotsProvider> {/* Wrap the app with PlotsProvider */}
      <Router>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <div style={themeStyles}>
            <Header />
            <nav style={{ ...styles.nav, backgroundColor: theme === 'light' ? '#f1f1f1' : '#1e1e1e' }}>
              <div style={styles.links}>
                <Link to="/" style={{ ...styles.navLink, color: theme === 'light' ? '#000' : '#fff' }}>
                  <span role="img" aria-label="Weather Icon">🌤</span> Current Weather
                </Link>
                <Link to="/plots" style={{ ...styles.navLink, color: theme === 'light' ? '#000' : '#fff' }}>
                  <span role="img" aria-label="Trends Icon">📊</span> Weather Trends
                </Link>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  ...styles.toggleButton,
                  backgroundColor: theme === 'light' ? '#333' : '#fff',
                  color: theme === 'light' ? '#fff' : '#333',
                }}
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </nav>
            {/* Add WeatherQuotes below the navigation bar */}
            <WeatherQuotes />
            <Routes>
              <Route path="/" element={<CurrentConditions />} />
              <Route path="/plots" element={<Plots />} />
            </Routes>
            <Footer />
          </div>
        )}
      </Router>
    </PlotsProvider>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between links and toggle button
    padding: '15px 30px',
    marginBottom: '20px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  links: {
    display: 'flex',
    alignItems: 'center', // Align navigation links vertically
    gap: '20px', // Space between navigation links
  },
  navLink: {
    display: 'flex',
    alignItems: 'center', // Align icon and text in navigation link
    gap: '8px', // Space between icon and text
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  toggleButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default App;
