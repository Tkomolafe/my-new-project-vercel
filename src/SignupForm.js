import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const SignupForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState(''); // For success/error messages
  const [loading, setLoading] = useState(false); // For loading state

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
      setTimeout(() => onNavigate('uploadOptions'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error signing up:', error.message);
      setMessage('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>SIGN UP</h1>
      <form style={styles.form} onSubmit={handleSignUp}>
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span style={styles.eyeIcon}>👁️</span>
          </div>
        </div>
        <div style={styles.rememberMeContainer}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            style={styles.checkbox}
            onChange={handleCheckboxChange}
          />
          <label style={styles.rememberMeLabel} htmlFor="terms">
            <strong style={styles.underlineText}>I accept the terms & conditions</strong>
          </label>
        </div>
        {message && <p style={styles.messageText}>{message}</p>}
        <button type="submit" style={styles.button} disabled={!termsAccepted || loading}>
          {loading ? 'Signing Up...' : 'SIGN UP'}
        </button>
      </form>
      <p style={styles.signupText}>
        Own an Account? <span style={styles.signupLink} onClick={() => onNavigate('loginForm')}>SIGN IN</span>
      </p>
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
    fontSize: '20px',
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
  underlineText: {
    textDecoration: 'underline',
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
  },
  signupText: {
    marginTop: '20px',
    color: '#888',
  },
  signupLink: {
    color: '#28a745',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  messageText: {
    color: 'black',
    marginBottom: '10px',
    textAlign: 'center',
  },
};



export default SignupForm;
