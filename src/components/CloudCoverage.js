import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaCloudSun, FaCloudMeatball, FaSun } from 'react-icons/fa';
import { fetchCSV } from '../utils/fetchCSV';

const cloudStates = [
  { label: 'No Clouds', icon: <FaSun />, color: '#FFD700', description: 'Clear skies' },
  { label: 'Thin Clouds', icon: <FaCloudSun />, color: '#87CEEB', description: 'Partially cloudy' },
  { label: 'Thick Clouds', icon: <FaCloudMeatball />, color: '#778899', description: 'Overcast' },
  { label: 'Cirrus Clouds', icon: <FaCloud />, color: '#B0E0E6', description: 'Wispy clouds' },
];

const CloudCoverage = () => {
  const [activeState, setActiveState] = useState(0);
  const [irValues, setIrValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which IR value is being displayed

  // Fetch the IR values from the CSV file
  useEffect(() => {
    fetchCSV('/clouds.csv').then((data) => {
      const values = data.map((row) => parseFloat(row.ir_value));
      setIrValues(values);
    });
  }, []);

  // Update the active state every 10 seconds
  useEffect(() => {
    if (irValues.length > 0) {
      const timer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % irValues.length; // Cycle through values
        const irValue = irValues[nextIndex];
        setCurrentIndex(nextIndex);

        // Determine the active state based on the IR value
        if (irValue < 0.3) setActiveState(0); // No Clouds
        else if (irValue < 0.6) setActiveState(1); // Thin Clouds
        else if (irValue < 0.8) setActiveState(2); // Thick Clouds
        else setActiveState(3); // Cirrus Clouds
      }, 10000);

      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [irValues, currentIndex]);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Cloud Coverage</h3>
      <div style={styles.grid}>
        {cloudStates.map((state, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: activeState === index ? state.color : '#f0f0f0',
              color: activeState === index ? '#fff' : '#000',
            }}
            whileHover={{ scale: activeState === index ? 1.1 : 1 }} // Highlight lit components
          >
            <motion.div
              style={styles.icon}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {state.icon}
            </motion.div>
            <h4>{state.label}</h4>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '20px',
    width: '150px',
    height: '150px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  icon: {
    fontSize: '50px',
    marginBottom: '10px',
  },
};

export default CloudCoverage;
