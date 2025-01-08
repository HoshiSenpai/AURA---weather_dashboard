import React, { createContext, useState, useEffect } from 'react';
import { fetchCSV } from '../utils/fetchCSV';

export const PlotsContext = createContext();

export const PlotsProvider = ({ children }) => {
  const [plotData, setPlotData] = useState({
    labels: [],
    datasets: {
      temperature: [],
      humidity: [],
      windSpeed: [],
    },
  });
  const [stats, setStats] = useState({ temp: {}, humidity: {}, windSpeed: {} });
  const [csvData, setCsvData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateStats = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(2);
    return { max, min, avg };
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchCSV('/weather.csv');
      setCsvData(data);
      const lastProcessedTimestamp = localStorage.getItem('lastProcessedTimestamp');
      const timestamps = data.map((row) => row.timestamp);
      const startIndex = lastProcessedTimestamp
        ? timestamps.findIndex((ts) => ts === lastProcessedTimestamp) + 1
        : 0;
      setCurrentIndex(startIndex);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      const interval = setInterval(() => {
        if (currentIndex >= csvData.length) {
          clearInterval(interval);
          return;
        }

        const currentRow = csvData[currentIndex];
        if (!currentRow) return;

        setPlotData((prevData) => {
          const updatedTemp = [...prevData.datasets.temperature, parseFloat(currentRow.temp)];
          const updatedHumidity = [...prevData.datasets.humidity, parseFloat(currentRow.humidity)];
          const updatedWindSpeed = [...prevData.datasets.windSpeed, parseFloat(currentRow.wind_speed)];

          setStats({
            temp: calculateStats(updatedTemp),
            humidity: calculateStats(updatedHumidity),
            windSpeed: calculateStats(updatedWindSpeed),
          });

          return {
            labels: [...prevData.labels, currentRow.timestamp],
            datasets: {
              temperature: updatedTemp,
              humidity: updatedHumidity,
              windSpeed: updatedWindSpeed,
            },
          };
        });

        localStorage.setItem('lastProcessedTimestamp', currentRow.timestamp);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [csvData, currentIndex]);

  return (
    <PlotsContext.Provider value={{ plotData, stats }}>
      {children}
    </PlotsContext.Provider>
  );
};
