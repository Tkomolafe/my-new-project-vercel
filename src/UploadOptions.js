import React from 'react';

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
        // Pass the data URL to the parent component
        onImageSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
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
      <button style={styles.button} onClick={handleTakePicture}>
        Take a Picture
      </button>
      <button style={styles.button} onClick={handleUploadFromGallery}>
        Upload from Gallery
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
    margin: '20px',
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

export default UploadOptions;
