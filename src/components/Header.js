import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie Player if using an animated icon

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = date.toLocaleDateString('en-US', options);

    // Add suffix to day
    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return `${dateStr.replace(day, `${day}${suffix}`)}`;
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Handle 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        {/* Animated Icon and Title */}
        <Player
          autoplay
          loop
          src="/icons/weather-icon.json" // Path to your Lottie file
          style={{ height: '50px', width: '50px', marginRight: '10px' }}
        />
        <h1 style={styles.title}>AURA - Advanced Understanding of Regional Atmosphere</h1>
      </div>
      <div style={styles.rightSection}>
        {/* Organization Logo */}
        <img
          src="/logos/logo.png" // Path to your PNG logo
          alt="Organization Logo"
          style={styles.logo}
        />
        {/* Date and Time */}
        <div style={styles.dateTime}>
          <div>{formatDate(currentTime)}</div>
          <div>{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column', // Stack logo above date and time
    alignItems: 'center', // Center align both logo and date/time
  },
  logo: {
    height: '60px',
    width: '280px', // Adjust the size of the logo as needed
    marginBottom: '10px', // Space between logo and date/time
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
   dateTime: {
    display: 'flex', // Align date and time horizontally
    flexDirection: 'row', // Horizontal layout
    gap: '10px', // Space between date and time
    fontSize: '14px',
  },
};

export default Header;
