import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        onNavigate('uploadOptions');
      }, 2000); // Delay for 2 seconds before redirecting
    } catch (error) {
      setMessage('Login failed. Please check your credentials and try again.');
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
      setForgotPasswordEmail(''); // Clear the email input
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
    setMessage(''); // Clear message when toggling modes
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      {isForgotPasswordMode ? (
        <div style={styles.forgotPasswordContainer}>
          <h2 style={styles.header}>Forgot Password</h2>
          <input
            type="email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
          {message && <p style={styles.messageText}>{message}</p>}
          <button
            type="button"
            style={{ ...styles.button, width: '100%' }}
            onClick={handleForgotPassword}
            disabled={loading}
          >
            {loading ? (
              <>
                Sending... <FaSpinner style={styles.spinner} />
              </>
            ) : (
              'Send Reset Email'
            )}
          </button>
          <p style={styles.backToLogin} onClick={toggleForgotPasswordMode}>
            Back to Login
          </p>
        </div>
      ) : (
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passwordContainer}>
              <input
                style={styles.input}
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span style={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div style={styles.rememberMeContainer}>
            <input
              type="checkbox"
              id="rememberMe"
              style={styles.checkbox}
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label style={styles.rememberMeLabel} htmlFor="rememberMe">Remember Me</label>
          </div>
          {message && (
            <div style={styles.messageContainer}>
              <FaCheckCircle style={styles.successIcon} />
              <p style={styles.messageText}>{message}</p>
            </div>
          )}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <>
                Logging In... <FaSpinner style={styles.spinner} />
              </>
            ) : (
              'Log In'
            )}
          </button>
          <p style={styles.forgotPassword} onClick={toggleForgotPasswordMode}>
            Forgot Password?
          </p>
          <p style={styles.signupText}>
            No Account yet? <span style={styles.signupLink} onClick={handleSignUp}>Sign Up</span>
          </p>
        </form>
      )}
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
  header: {
    color: '#28a745',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#888',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
    color: '#888', // Style the eye icon
  },
  rememberMeContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  checkbox: {
    marginRight: '10px',
  },
  rememberMeLabel: {
    color: '#888',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginLeft: '10px',
    fontSize: '18px',
  },
  signupText: {
    marginTop: '20px',
    color: '#888',
  },
  signupLink: {
    color: '#28a745',
    cursor: 'pointer',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  messageText: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  successIcon: {
    color: '#28a745',
  },
  forgotPassword: {
    color: '#28a745',
    cursor: 'pointer',
    marginTop: '10px',
  },
  forgotPasswordContainer: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backToLogin: {
    color: '#28a745',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
};

export default LoginForm;
