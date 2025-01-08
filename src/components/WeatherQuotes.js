import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the ThemeContext

const quotes = [
  'The sun always shines above the clouds.',
  'Nature does not hurry, yet everything is accomplished.',
  'Rain is grace; rain is the sky descending to the earth.',
  'A change in the weather is sufficient to recreate the world.',
  'Wherever you go, no matter what the weather, always bring your own sunshine.',
  'Some people feel the rain. Others just get wet. — Bob Marley',
  'There’s no such thing as bad weather, only different kinds of good weather. — John Ruskin',
  'The sound of rain needs no translation.',
  'Sunshine is delicious, rain is refreshing, wind braces us, snow is exhilarating. — John Ruskin',
  'Weather means more when you have a garden. — Marcelene Cox',
  'Do not be angry with the rain; it simply does not know how to fall upwards. — Vladimir Nabokov',
  'If you want to see the sunshine, you have to weather the storm. — Frank Lane',
  'Rain showers my spirit and waters my soul. — Emily Logan Decens',
  'The best thing one can do when it’s raining is to let it rain. — Henry Wadsworth Longfellow',
  'Life is full of beauty. Notice the bumblebee, the small child, and the smiling faces. — Ashley Smith',
  'Storms make trees take deeper roots. — Dolly Parton',
  'After a storm comes a calm. — Matthew Henry',
  'Even the darkest night will end, and the sun will rise. — Victor Hugo',
  'Rain is the perfect excuse for a cozy day in.',
  'The rainbow is a promise of sunshine after rain. — Roy T. Bennett',
  'The weather is a great metaphor for life: Sometimes it’s good, sometimes it’s bad, and there’s nothing much you can do about it. — Pepper Giardino',
  'Sunshine is the best medicine.',
  'Rainbows apologize for angry skies. — Sylvia Voirol',
  'The sky is the daily bread of the eyes. — Ralph Waldo Emerson',
  'When the sun is shining, I can do anything; no mountain is too high, no trouble too difficult to overcome. — Wilma Rudolph',
];

const WeatherQuotes = () => {
  const { theme } = useTheme(); // Access theme from ThemeContext
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    // Function to set a random quote
    const setRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    };

    setRandomQuote(); // Set the initial quote
    const interval = setInterval(setRandomQuote, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array to avoid re-running on every render

  const styles = {
    container: {
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      padding: '15px',
      borderRadius: '10px',
      margin: '20px auto',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      fontStyle: 'italic',
      fontSize: '18px',
      maxWidth: '600px',
    },
  };

  return (
    <div style={styles.container}>
      {currentQuote}
    </div>
  );
};

export default WeatherQuotes;
