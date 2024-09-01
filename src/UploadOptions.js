import React, { useState, useRef } from 'react';
import { FaCamera, FaImages } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadOptions = ({ onImageSelect }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleTakePicture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsCapturing(true);
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    } else {
      document.getElementById('cameraInput').click();
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');
    onImageSelect(imageDataURL);

    // Stop the video stream
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCapturing(false);
  };

  const handleUploadFromGallery = () => {
    document.getElementById('galleryInput').click();
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result);  // Send the base64 image to parent component
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
          {!isCapturing ? (
            <>
              <button
                className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
                onClick={handleTakePicture}
                aria-label="Take a picture with your camera"
              >
                <FaCamera className="me-2" />
                Take a Picture
              </button>
              <button
                className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
                onClick={handleUploadFromGallery}
                aria-label="Upload an image from your gallery"
              >
                <FaImages className="me-2" />
                Upload from Gallery
              </button>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <video ref={videoRef} style={{ width: '100%' }} />
              <button
                className="btn btn-danger btn-lg mt-3"
                onClick={handleCapture}
                aria-label="Capture photo from webcam"
              >
                Capture Photo
              </button>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadOptions;
