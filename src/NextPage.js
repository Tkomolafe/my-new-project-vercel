import React, { useState } from 'react';
import CropModal from './CropModal';
import { FaCrop } from 'react-icons/fa';

const NextPage = ({ selectedImage, setCurrentPage }) => {
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [displayImage, setDisplayImage] = useState(selectedImage);

 const handleEstimateAge = async () => {
    setLoading(true);
    setError('');

    try {
        const response = await fetch(displayImage);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        const formData = new FormData();
        formData.append('image', blob, 'image.jpg');

        const res = await fetch('/predict', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Failed to estimate age');
        }

        const data = await res.json();
        setAge(data.estimated_age);
    } catch (error) {
        console.error('Error estimating age:', error);
        setError('There was an issue estimating the age. Please try again.');
    } finally {
        setLoading(false);
    }
};

  const handleCropComplete = (croppedImage) => {
    setDisplayImage(croppedImage);
    setShowCropModal(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4">
      {displayImage && (
        <div className="mb-4 position-relative">
          <img
            src={displayImage}
            alt="Selected"
            className="img-thumbnail"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          <button
            className="btn btn-outline-info position-absolute top-0 end-0"
            onClick={() => setShowCropModal(true)}
            aria-label="Crop Image"
            style={{ transform: 'translate(50%, -50%)' }}
          >
            <FaCrop />
          </button>
        </div>
      )}
      <div className="d-flex flex-column gap-3 align-items-center">
        <button
          className="btn btn-info btn-lg d-flex align-items-center"
          onClick={() => setCurrentPage('uploadOptions')}
          aria-label="Upload Again"
        >
          Upload Again
        </button>
        <button
          className="btn btn-success btn-lg d-flex align-items-center"
          onClick={handleEstimateAge}
          disabled={loading}
          aria-label={loading ? 'Estimating Age' : 'Proceed to Age Estimation'}
        >
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Estimating Age...
            </span>
          ) : (
            'Proceed to Age Estimation'
          )}
        </button>
      </div>
      {age !== null && !loading && !error && (
        <div className="mt-4 d-flex align-items-center justify-content-center gap-2 fs-4 fw-bold">
          <p className="mb-0">Estimated Age: {age}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {showCropModal && (
        <CropModal
          show={showCropModal}
          handleClose={() => setShowCropModal(false)}
          imageSrc={displayImage}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default NextPage;
