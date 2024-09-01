import React, { useState } from 'react';
import { auth } from './firebase';
import { sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); // State for message color
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setMessage('You must accept the terms and conditions.');
      setMessageColor('text-danger'); // Red for error messages
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageColor(''); // Reset message color

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      // Send email verification link
      await sendEmailVerification(currentUser);

      setMessage('Signup successful! A verification link has been sent to your email. Please verify your email and log in.');
      setMessageColor('text-success'); // Green for success messages
      
      // Redirect to login after a few seconds
      setTimeout(() => onNavigate('loginForm'), 5000);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setMessage('Signup failed: ' + error.message);
      setMessageColor('text-danger'); // Red for error messages
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShowTerms = () => {
    setShowTermsModal(true);
  };

  const handleCloseTerms = () => {
    setShowTermsModal(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-success fw-bold mb-4">Welcome to Our Platform!</h1>
      <p className="text-muted mb-4">Join us today to experience all the amazing features.</p>
      <form className="w-100" onSubmit={handleSignUp} style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-group">
            <input
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              aria-label="Password"
            />
            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
              {showPassword ? <FaEyeSlash title="Hide Password" /> : <FaEye title="Show Password" />}
            </span>
          </div>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            onChange={(event) => setTermsAccepted(event.target.checked)}
            aria-label="Accept Terms and Conditions"
          />
          <label className="form-check-label" htmlFor="terms">
            I accept the{' '}
            <span
              className="text-success"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={handleShowTerms}
            >
              terms & conditions
            </span>
          </label>
        </div>
        {message && <p className={`${messageColor} text-center mb-3`} aria-live="polite">{message}</p>}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={!termsAccepted || loading}
        >
          {loading ? 'Signing Up...' : 'SIGN UP'}
        </button>
      </form>
      <p className="text-muted mt-3">
        Already have an account?{' '}
        <span className="text-success fw-bold" style={{ cursor: 'pointer' }} onClick={() => onNavigate('loginForm')}>
          Sign In
        </span>
      </p>

      {/* Modal for Terms & Conditions */}
      {showTermsModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Terms & Conditions</h5>
                <button type="button" className="btn-close" onClick={handleCloseTerms}></button>
              </div>
              <div className="modal-body">
                <h2>Terms & Conditions</h2>
                <p>
                  By using this platform, you agree to the following terms and conditions. This platform utilizes advanced AI algorithms 
                  to estimate age based on facial images. The results provided by the age estimation model are for informational purposes 
                  only and should not be considered as definitive or legally binding. The accuracy of the estimation may vary depending on 
                  several factors, including image quality and lighting conditions. Users must ensure that they provide clear and high-quality 
                  images for better accuracy. The platform does not store or share your images or personal information with third parties. 
                  You are responsible for ensuring that the images you upload comply with all applicable laws and regulations. By accepting 
                  these terms, you also acknowledge that the platform is not responsible for any decisions or actions taken based on the 
                  estimated age results. If you do not agree with these terms, please do not use the platform.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseTerms}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
