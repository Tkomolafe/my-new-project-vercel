import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AgeEstimator from './AgeEstimator';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import UploadOptions from './UploadOptions';
import NextPage from './NextPage';
import { auth } from './firebase';

const App = () => {
  const [currentPage, setCurrentPage] = useState('ageEstimator');
  const [selectedImage, setSelectedImage] = useState(null);
  const [age, setAge] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setCurrentPage('loginForm');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
    setCurrentPage('nextPage');
  };

  const handleEstimateAge = async () => {
    setLoading(true);

    try {
      const response = await fetch('/estimate-age', { // Use relative URL if proxy is set up
        method: 'POST',
        body: selectedImage, // Assuming selectedImage is a FormData object
      });
      const result = await response.json();
      setAge(result.age);
      setConfidence(result.confidence);
    } catch (error) {
      console.error('Error estimating age:', error);
      setAge('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {currentPage === 'ageEstimator' && <AgeEstimator onNavigate={setCurrentPage} />}
      {currentPage === 'loginForm' && <LoginForm onNavigate={setCurrentPage} />}
      {currentPage === 'signupForm' && <SignupForm onNavigate={setCurrentPage} />}
      {currentPage === 'uploadOptions' && user && <UploadOptions onImageSelect={handleImageSelect} />}
      {currentPage === 'nextPage' && (
        <NextPage
          selectedImage={selectedImage}
          setCurrentPage={setCurrentPage}
          handleEstimateAge={handleEstimateAge}
          age={age}
          confidence={confidence}
          loading={loading}
        />
      )}
    </div>
  );
};

export default App;
