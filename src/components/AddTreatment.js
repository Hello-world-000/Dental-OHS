// src/components/AddTreatment.js

import React, { useState, useEffect } from 'react';
import { createTreatment, getPatients, getdoctors } from '../api'; // Assuming you have the correct API call functions
import { Container, TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddTreatment = () => {
  const [treatment, setTreatment] = useState({
    description: '',
    patient_id: '',
    doctor_id: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setdoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientsAnddoctors = async () => {
      const patientsData = await getPatients();
      const doctorsData = await getdoctors();
      setPatients(patientsData);
      setdoctors(doctorsData);
    };
    fetchPatientsAnddoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTreatment = await createTreatment(treatment);
    if (newTreatment) {
      navigate('/treatments');
    }
  };

  return (
    <Container align="center">
      <Typography variant="h5" sx={{ m: 3 }}>Add New Treatment</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={treatment.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="patient-select-label">Select Patient</InputLabel>
              <Select
                labelId="patient-select-label"
                name="patient_id"
                value={treatment.patient_id}
                onChange={handleChange}
                fullWidth
                required
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="doctor-select-label">Select doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                name="doctor_id"
                value={treatment.doctor_id}
                onChange={handleChange}
                fullWidth
                required
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.first_name} {doctor.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ m: 3 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddTreatment;
