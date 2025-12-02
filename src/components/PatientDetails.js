import React, { useEffect, useState } from 'react';
import { getPatientById } from '../api';  // Make sure you have a function to fetch patient by ID
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, CircularProgress, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

// const API_URL = 'http://127.0.0.1:5000/static/';  
const API_URL = 'http://3.80.126.80:5000/static/';  

const PatientDetails = () => {
  const { id } = useParams();  // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await getPatientById(id);
        console.log(data)
        setPatient(data);
      } catch (error) {
        setError("Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Typography variant="h4">Patient Details</Typography>
      {patient && (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Name:</Typography>
              <Typography>{`${patient.first_name} ${patient.last_name}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Age:</Typography>
              <Typography>{patient.age}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Location:</Typography>
              <Typography>{patient.location}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Problem:</Typography>
              <Typography>{patient.problem}</Typography>
            </Grid>
            {patient.images && patient.images.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6">Images:</Typography>
                <div>
                  {patient.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${API_URL}${image.image_path.split('\\')[1]}`}  // The URL to the image
                      alt={`Patient Image ${index}`}
                      style={{ width: '150px', height: '150px', marginRight: '10px' }}
                    />
                  ))}
                </div>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      <Button variant="contained" color="primary" component={Link} to="/patients" style={{ marginTop: '20px' }}>
        Back to Patients List
      </Button>
    </Container>
  );
};

export default PatientDetails;
