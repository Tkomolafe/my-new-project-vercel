import React, { useState } from 'react';
import { FaCamera, FaImages } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadOptions = ({ onImageSelect }) => {
  const [loading, setLoading] = useState(false);

  const handleTakePicture = () => {
    document.getElementById('cameraInput').click();
  };

  const handleUploadFromGallery = () => {
    document.getElementById('galleryInput').click();
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      setLoading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result);  // Send the base64 image to parent component
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light p-4">
      <div className="card text-center p-4 shadow" style={{ width: '300px', borderRadius: '10px' }}>
        <h2 className="text-success mb-3">Choose an Option</h2>
        <p className="text-muted mb-4">Select an option to proceed with your image upload</p>
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
        <div className="d-flex flex-column gap-3">
          <button
            className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
            onClick={handleTakePicture}
            aria-label="Take a picture with your camera"
            disabled={loading}
          >
            <FaCamera className="me-2" />
            Take a Picture
          </button>
          <button
            className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
            onClick={handleUploadFromGallery}
            aria-label="Upload an image from your gallery"
            disabled={loading}
          >
            <FaImages className="me-2" />
            Upload from Gallery
          </button>
        </div>
        {loading && (
          <div className="mt-4 d-flex align-items-center justify-content-center gap-2 fs-4 fw-bold">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadOptions;
