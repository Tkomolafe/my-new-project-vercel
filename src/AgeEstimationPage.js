// AgeEstimationPage.js
import React from 'react';

const AgeEstimationPage = ({ age, confidence, setCurrentPage }) => {
  return (
    <div style={styles.container}>
      <h1>Age Estimation Result</h1>
      <p>Estimated Age: {age}</p>
      <p>Confidence: {confidence}%</p>
      <button style={styles.button} onClick={() => setCurrentPage('uploadOptions')}>
        Upload Another Image
      </button>
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
    backgroundColor: '#fff',
  },
  button: {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default AgeEstimationPage;
