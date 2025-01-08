import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';
import { PlotsContext } from '../context/PlotsContext';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Plots = () => {
  const { theme } = useTheme();
  const { plotData, stats } = useContext(PlotsContext);

  const chartOptions = (color) => ({
  responsive: true,
  plugins: {
    legend: { labels: { color: theme === 'light' ? '#000' : '#fff' } },
  },
  scales: {
    x: {
      ticks: {
        color: theme === 'light' ? '#000' : '#fff',
        callback: function (value, index, values) {
          // Get the timestamp for the current tick
          const timestamp = this.getLabelForValue(value);

          // Convert timestamp to minutes or hours dynamically
          const date = new Date(timestamp);
          const hours = date.getHours();
          const minutes = date.getMinutes();

          if (values.length > 10) {
            // If there are many points, display hours
            return `${hours}h`;
          } else {
            // Otherwise, display minutes
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
          }
        },
      },
      grid: { color: theme === 'light' ? '#e0e0e0' : color },
    },
    y: {
      ticks: { color: theme === 'light' ? '#000' : '#fff' },
      grid: { color: theme === 'light' ? '#e0e0e0' : color },
    },
  },
});


  return (
    <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="grid">
        {['Temperature', 'Humidity', 'Wind Speed'].map((param, index) => {
          const color =
            param === 'Temperature'
              ? theme === 'light' ? 'red' : 'lightblue'
              : param === 'Humidity'
              ? theme === 'light' ? 'green' : 'lightgreen'
              : theme === 'light' ? 'orange' : 'gold';

          const data =
            param === 'Temperature'
              ? plotData.datasets.temperature
              : param === 'Humidity'
              ? plotData.datasets.humidity
              : plotData.datasets.windSpeed;

          const stat =
            param === 'Temperature'
              ? stats.temp
              : param === 'Humidity'
              ? stats.humidity
              : stats.windSpeed;

          return (
            <div key={index} className="tile">
              <h2>{param} Trends</h2>
              <p>
                Max: {stat.max} | Min: {stat.min} | Avg: {stat.avg}
              </p>
              <Line
                data={{
                  labels: plotData.labels,
                  datasets: [
                    {
                      label: param,
                      data: data,
                      borderColor: color,
                      backgroundColor: `${color}33`,
                    },
                  ],
                }}
                options={chartOptions(color)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plots;
