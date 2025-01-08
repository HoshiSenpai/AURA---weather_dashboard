import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      Indian Astronomical Observatory, Hanle - Ladakh | PseudoCoder
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
  },
};

export default Footer;
