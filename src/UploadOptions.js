import React from 'react';
import { FaCamera, FaImages } from 'react-icons/fa'; // Import icons for better visuals

const UploadOptions = ({ onImageSelect }) => {
  const handleTakePicture = () => {
    document.getElementById('cameraInput').click();
  };

  const handleUploadFromGallery = () => {
    document.getElementById('galleryInput').click();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          id="cameraInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <input
          type="file"
          accept="image/*"
          id="galleryInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleTakePicture}>
            <FaCamera style={styles.icon} />
            Take a Picture
          </button>
          <button style={styles.button} onClick={handleUploadFromGallery}>
            <FaImages style={styles.icon} />
            Upload from Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
    transform: 'scale(1.05)',
  },
  icon: {
    marginRight: '10px',
  },
};

export default UploadOptions;
