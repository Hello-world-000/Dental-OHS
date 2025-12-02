import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for decoding the JWT

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('access_token');

  // Check if token exists and is not expired
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token is expired, clear it and redirect to login
        localStorage.removeItem('access_token');
        return <Navigate to="/login" />;
      }

      // If the token is valid, render the protected component
      return element;
    } catch (error) {
      // If the token is invalid or cannot be decoded, clear it and redirect to login
      localStorage.removeItem('access_token');
      return <Navigate to="/login" />;
    }
  }

  // If no token is found, redirect to the login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;
