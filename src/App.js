import React, { useState , useEffect} from 'react';
import { Box } from "@mui/material";

import './App.css';
import SplashScreen from './SplashScreen';
import Login from './LoginPage';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import DoctorList from './components/DoctorList';
import Adddoctor from './components/Adddoctor';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import TreatmentList from './components/TreatmentList';
import AddTreatment from './components/AddTreatment';
import PatientDetails from './components/PatientDetails';
import MainContent from './components/MainContent';
import ResultsPage from './components/ResultsPage';

import AppTitle from './components/AppTitle';

import { jwtDecode } from 'jwt-decode';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if access_token exists and is valid
    const token = localStorage.getItem('access_token');
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);  // Token exists and is valid
    } else {
      setIsAuthenticated(false); // No valid token
    }
  }, []);


  // Function to verify the validity of the JWT
  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);

      // Check if token has expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired
        return false;
      }

      // If you need to validate other claims, you can do so here
      // Example: Check the "iss" (issuer) or "aud" (audience) if needed

      return true; // Token is valid
    } catch (error) {
      // Invalid token or cannot decode
      console.error('Token is invalid or malformed', error);
      return false;
    }
  };



  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* MAIN CONTENT AREA */}
    <Box sx={{ flex: 1 }}>

   
      <Routes>
        {/* Splash Screen Route */}
        {isLoading && !(isAuthenticated) ? (
          <>
           <Route path="/" element={<SplashScreen onLoadComplete={handleLoadComplete} />} />
           <Route path="/login" element={<SplashScreen onLoadComplete={handleLoadComplete} />} />
          </>
         

        ) : (
          <>
            {/* Login Route */}
            <Route path="/login" element={<> <AppTitle/> <Login /> </>} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<><Header /><MainContent /></>} />}
            />
            <Route
              path="/doctors"
              element={<PrivateRoute element={<><Header /><DoctorList /></>} />}
            />
            <Route
              path="/add-doctor"
              element={<PrivateRoute element={<><Header /><Adddoctor /></>} />}
            />
            <Route
              path="/patients"
              element={<PrivateRoute element={<><Header /><PatientList /></>} />}
            />
            <Route
              path="/add-patient"
              element={<PrivateRoute element={<><Header /><AddPatient /></>} />}
            />
            <Route
              path="/patients/:id"
              element={<PrivateRoute element={<><Header /><PatientDetails /></>} />}
            />
            <Route
              path="/treatments"
              element={<PrivateRoute element={<><Header /><TreatmentList /></>} />}
            />
            <Route
              path="/add-treatment"
              element={<PrivateRoute element={<><Header /><AddTreatment /></>} />}
            />
            <Route
              path="/results"
              element={<PrivateRoute element={<><Header /><ResultsPage /></>} />}
            />

            {/* Redirect to login for unknown routes */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      </Box>

      {/* Footer will be always visible */}
      <Footer  />
        </Box>
    </Router>
  );
}

export default App;
