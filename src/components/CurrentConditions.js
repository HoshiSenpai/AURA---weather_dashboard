import React, { useEffect, useState } from 'react';
import { fetchCSV } from '../utils/fetchCSV';
import { useTheme } from '../context/ThemeContext';
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie Player
import CloudCoverage from './CloudCoverage'; // Ensure CloudCoverage is included
import './CurrentConditions.css'; // Import CSS file for hover effects

const CurrentConditions = () => {
  const { theme } = useTheme();
  const [weatherData, setWeatherData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCSV('/weather.csv').then((data) => {
      setWeatherData(data);
    });
  }, []);

  useEffect(() => {
    if (weatherData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherData.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [weatherData]);

  if (weatherData.length === 0) return <div>Loading...</div>;

  const currentWeather = weatherData[currentIndex];

  // Map Lottie animations to weather parameters
  const getAnimation = (label) => {
    if (label === 'Temperature') return '/lottie/sun.json';
    if (label === 'Humidity') return '/lottie/cloud.json';
    if (label === 'Wind Speed') return '/lottie/wind.json';
    if (label === 'Rain') return '/lottie/rain.json';
    return '/lottie/sun.json'; // Default animation
  };

  const parameters = [
    { label: 'Temperature', value: `${currentWeather.temp}°C`, animation: getAnimation('Temperature') },
    { label: 'Humidity', value: `${currentWeather.humidity}%`, animation: getAnimation('Humidity') },
    { label: 'Wind Speed', value: `${currentWeather.wind_speed} m/s`, animation: getAnimation('Wind Speed') },
    { label: 'Rain', value: currentWeather.rain === 'Yes' ? 'Yes' : 'No', animation: getAnimation('Rain') },
  ];

  const themeStyles = theme === 'light' ? 'light' : 'dark';

  return (
    <div className={`container ${themeStyles}`}>
      <div className="grid">
        {parameters.map((param, index) => (
          <div key={index} className={`tile ${themeStyles}`}>
            <Player
              autoplay
              loop
              src={param.animation} // Use Lottie animations
              style={{ height: '100px', width: '100px' }}
            />
            <h3>{param.label}</h3>
            <p>{param.value}</p>
          </div>
        ))}
      </div>
      <div className="cloudCoverage">
        <h2>Cloud Coverage</h2>
        <CloudCoverage />
      </div>
    </div>
  );
};

export default CurrentConditions;
