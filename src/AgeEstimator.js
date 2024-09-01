import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgeEstimator = ({ onNavigate }) => {
  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate('loginForm');
    } else {
      console.error('onNavigate is not defined');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-success text-center">
      <div 
        className="rounded-circle overflow-hidden mb-3" 
        style={{ width: '200px', height: '200px', animation: 'pulse 2s infinite' }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/2112.png`}
          alt="Face"
          className="img-fluid"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <p className="text-white fs-6 fw-bold mb-3 text-shadow-sm">
        UPLOAD & ESTIMATE AGE...
      </p>
      <button 
        className="btn btn-light text-success px-4 py-2 rounded-pill shadow mt-3" 
        onClick={handleGetStarted}
        style={{ transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} 
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Get started with age estimation"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default AgeEstimator;

