import React, { useState } from 'react';

const NextPage = ({ selectedImage, setCurrentPage }) => {
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEstimateAge = async () => {
    setLoading(true);

    try {
      // Convert the selected image URL to a Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Prepare form data with the image blob
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      // Send the image to the backend for age estimation
      const res = await fetch('/estimate-age', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to estimate age');
      }

      const data = await res.json();
      setAge(data.age);
    } catch (error) {
      console.error('Error estimating age:', error);
      setAge('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {selectedImage && (
        <div style={styles.imageContainer}>
          <img src={selectedImage} alt="Selected" style={styles.image} />
        </div>
      )}
      <div style={styles.buttonsContainer}>
        <button style={styles.switchButton} onClick={() => setCurrentPage('uploadOptions')}>
          UPLOAD AGAIN
        </button>
        <button
          style={{
            ...styles.proceedButton,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleEstimateAge}
          disabled={loading}
        >
          {loading ? 'Estimating Age...' : 'PROCEED TO AGE ESTIMATION'}
        </button>
      </div>
      {age !== null && !loading && (
        <div style={styles.resultContainer}>
          <p>Estimated Age: {age}</p>
        </div>
      )}
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
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    marginBottom: '20px',
  },
  image: {
    width: '200px',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  switchButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#17a2b8',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  proceedButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  resultContainer: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default NextPage;
