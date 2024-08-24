import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setMessage('You must accept the terms and conditions.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Signup successful! Redirecting...');
      setTimeout(() => onNavigate('uploadOptions'), 2000);
    } catch (error) {
      console.error('Error signing up:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('This email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Password is too weak. Please choose a stronger password.');
      } else {
        setMessage('Signup failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <div className="text-muted small mt-2">
            Password strength: {/* Add your password strength meter here */}
          </div>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            onChange={handleCheckboxChange}
            aria-label="Accept Terms and Conditions"
          />
          <label className="form-check-label" htmlFor="terms">
            I accept the <a href="#!" className="text-success" style={{ textDecoration: 'underline' }}>terms & conditions</a>
          </label>
        </div>
        {message && <p className="text-danger text-center mb-3" aria-live="polite">{message}</p>}
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
    </div>
  );
};

export default SignupForm;
