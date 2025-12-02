// src/SplashScreen.js

import React, { useEffect } from 'react';
import './SplashScreen.css'; // Optional for styling

import splashGif from './assets/dental-clinic_9534762.gif'; // Adjust the path as needed

import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onLoadComplete }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      onLoadComplete();
      // navigate('/login'); 
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onLoadComplete]);

  return (
    <div className="splash-screen">
     
       <img src={splashGif} alt="Splash Screen" />
       <p className="loading-text">Loading...</p>
    </div>
  );
};

export default SplashScreen;
