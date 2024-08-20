// LoginForm.js
import React from 'react';

const LoginForm = ({ onNavigate }) => {
  const handleSignUp = () => {
    if (onNavigate) {
      onNavigate('signupForm');
    } else {
      console.error('onNavigate is not defined');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('uploadOptions');
    } else {
      console.error('onNavigate is not defined');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>LOGIN</h1>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email or Username
          </label>
          <input
            style={styles.input}
            type="text"
            id="email"
            name="email"
            placeholder="Email or Username"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <div style={styles.passwordContainer}>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <span style={styles.eyeIcon}>👁️</span>
          </div>
        </div>
        <div style={styles.rememberMeContainer}>
          <input type="checkbox" id="rememberMe" name="rememberMe" style={styles.checkbox} />
          <label style={styles.rememberMeLabel} htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <button type="submit" style={styles.button}>LOG IN</button>
      </form>
      <p style={styles.signupText}>
        No Account yet? <span style={styles.signupLink} onClick={handleSignUp}>SIGN UP</span>
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
};

export default LoginForm;