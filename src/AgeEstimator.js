import React from 'react';

const AgeEstimator = ({ onNavigate }) => {
  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate('loginForm');
    } else {
      console.error('onNavigate is not defined');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.circle}>
        <img
          src={`${process.env.PUBLIC_URL}/2112.png`}
          alt="Face"
          style={styles.image}
        />
      </div>
      <p style={styles.text}>UPLOAD & ESTIMATE AGE...</p>
      <button style={styles.button} onClick={handleGetStarted}>GET STARTED</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#28a745',
    textAlign: 'center',
  },
  circle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  text: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  button: {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#28a745',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default AgeEstimator;
