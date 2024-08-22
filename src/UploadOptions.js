import React, { useState, useEffect } from 'react';
import { FaCamera, FaImages } from 'react-icons/fa';
import * as faceapi from 'face-api.js';

const UploadOptions = ({ onImageSelect }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    loadModels();
  }, []);

  const handleTakePicture = () => {
    document.getElementById('cameraInput').click();
  };

  const handleUploadFromGallery = () => {
    document.getElementById('galleryInput').click();
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      setLoading(true); // Start loading indicator
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const image = new Image();
        image.src = reader.result;

        image.onload = async () => {
          const detections = await faceapi.detectSingleFace(image);
          setLoading(false); // Stop loading indicator

          if (detections) {
            const { box } = detections;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = box.width;
            canvas.height = box.height;

            // Draw only the face on the canvas
            ctx.drawImage(
              image,
              box.x,
              box.y,
              box.width,
              box.height,
              0,
              0,
              box.width,
              box.height
            );

            // Convert the canvas to a Data URL
            const faceImageUrl = canvas.toDataURL();
            onImageSelect(faceImageUrl);
          } else {
            alert('No face detected. Please try again with a different image.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {loading && <div style={styles.loading}>Processing...</div>} {/* Loading indicator */}
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
  loading: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#28a745',
  },
};

export default UploadOptions;
