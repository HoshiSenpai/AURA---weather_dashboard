import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <motion.div
        style={styles.logoContainer}
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 2 }}
      >
        <img
          src="/logos/new-logo.png" // Path to your new PNG logo
          alt="AURA Logo"
          style={styles.logo}
        />
      </motion.div>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        AURA
      </motion.h1>
      <motion.h2
        style={styles.subtitle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Advanced Understanding of Regional Atmosphere
      </motion.h2>
    </motion.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '46px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '28px',
    color: '#555',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default SplashScreen;
