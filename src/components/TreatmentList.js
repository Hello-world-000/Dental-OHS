// src/components/TreatmentList.js

import React, { useEffect, useState } from 'react';
import { getTreatments, deleteTreatment } from '../api';  // Assume you have API functions set up
import { Container, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TreatmentList = () => {
  const [treatments, setTreatments] = useState([]);

  // Fetch treatments from the backend
  useEffect(() => {
    const fetchTreatments = async () => {
      const data = await getTreatments();
      setTreatments(data);
    };
    fetchTreatments();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTreatment(id);
    if (success) {
      setTreatments(treatments.filter((treatment) => treatment.id !== id));
    }
  };

  return (
    <Container align="center">
      <Typography variant="h5" gutterBottom sx={{ m: 3 }}>
        {/* Treatment List */}
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/add-treatment" sx={{ mb: 3 }}>
        Add Treatment
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>doctor ID</TableCell>
              <TableCell>Treatment Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>{treatment.patient_id}</TableCell>
                <TableCell>{treatment.doctor_id}</TableCell>
                <TableCell>{new Date(treatment.treatment_date).toLocaleString()}</TableCell>
                <TableCell>{treatment.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(treatment.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TreatmentList;
