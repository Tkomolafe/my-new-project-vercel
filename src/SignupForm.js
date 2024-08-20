import React, { useState } from 'react';

const SignupForm = ({ onNavigate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignIn = () => {
    if (onNavigate) {
      onNavigate('loginForm');
    } else {
      console.error('onNavigate is not defined');
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
    if (!event.target.checked) {
      openModal();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>AGE ESTIMATOR</h1>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="username">
            Username
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
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
        <button type="submit" style={styles.button} disabled={!termsAccepted}>SIGN UP</button>
      </form>
      <p style={styles.signupText}>
        Own an Account? <span style={styles.signupLink} onClick={handleSignIn}>SIGN IN</span>
      </p>

      {/* Custom Modal */}
      {modalIsOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <h2>Terms and Conditions</h2>
            <p>Welcome to Age Estimator. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services. We collect personal information such as your username, email address, and password when you register for an account. This information is used to create and manage your account, and to communicate with you about our services. We also collect information about your interactions with our services, including your IP address, browser type, and access times, to improve our services and understand how users interact with our website. We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure, but cannot guarantee absolute security. We do not sell, trade, or otherwise transfer your personal information to outside parties except as required by law or necessary to provide our services. We may share your data with third-party service providers who assist us in operating our website or conducting our business, provided they agree to keep this information confidential. You have the right to access, correct, or delete your personal information, and to restrict or object to the processing of your data. To exercise these rights, please contact us at [Your Contact Information]. We may update these Terms and Conditions from time to time, and any changes will be posted on this page with an updated revision date. Your continued use of our services after any modifications constitutes your acceptance of the new terms. If you have any questions or concerns about these Terms and Conditions or our data practices, please contact us at [Your Contact Information]. By checking the box, you confirm that you have read, understood, and agree to these Terms and Conditions. Thank you for using Age Estimator.</p>
            <button onClick={closeModal} style={styles.button}>Close</button>
          </div>
        </div>
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
};

const modalStyles = {
  overlay: styles.modalOverlay,
  content: styles.modal,
};

export default SignupForm;
