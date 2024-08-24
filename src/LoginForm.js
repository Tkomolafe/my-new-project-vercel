import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { FaCheckCircle, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        onNavigate('uploadOptions');
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setMessage('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('No account found with this email.');
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setMessage('Password reset email sent. Check your inbox!');
      setForgotPasswordEmail('');
    } catch (error) {
      setMessage('Error sending reset email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    onNavigate('signupForm');
  };

  const toggleForgotPasswordMode = () => {
    setIsForgotPasswordMode(!isForgotPasswordMode);
    setMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-white">
      <h1 className="text-success mb-4">LOG IN</h1>
      {isForgotPasswordMode ? (
        <div className="w-100" style={{ maxWidth: '300px' }}>
          <h2 className="text-success mb-3">Forgot Password</h2>
          <input
            type="email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-control mb-3"
            aria-label="Forgot Password Email"
          />
          {message && <p className="text-center text-black">{message}</p>}
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            {loading ? (
              <>
                Sending... <FaSpinner className="ms-2 spinner-border spinner-border-sm" />
              </>
            ) : (
              'Send Reset Email'
            )}
          </button>
          <p className="text-success text-center mt-3" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={toggleForgotPasswordMode}>
            Back to Login
          </p>
        </div>
      ) : (
        <form className="w-100" style={{ maxWidth: '300px' }} onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              aria-label="Email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
              id="rememberMe"
              className="form-check-input"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              aria-label="Remember Me"
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-3`}>
              <FaCheckCircle className="me-2" />
              <p className="m-0">{message}</p>
            </div>
          )}
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <>
                Logging In... <FaSpinner className="ms-2 spinner-border spinner-border-sm" />
              </>
            ) : (
              'Log In'
            )}
          </button>
          <p className="text-success text-center mt-3" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={toggleForgotPasswordMode}>
            Forgot Password?
          </p>
          <p className="text-center mt-3">
            No Account yet?{' '}
            <span className="text-success" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleSignUp}>
              Sign Up
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
