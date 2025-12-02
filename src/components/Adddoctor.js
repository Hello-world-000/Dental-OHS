import React, { useState } from 'react';
import { createdoctor } from '../api';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Maximum lengths for the fields (based on your DB schema)
const MAX_NAME_LENGTH = 100; // example length for first_name and last_name
const MAX_SPECIALITY_LENGTH = 100; // example length for speciality

const Adddoctor = () => {
  const [doctor, setdoctor] = useState({
    first_name: '',
    last_name: '',
    age: '',
    department: '',
    speciality: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    age: '',
    department: '',
    speciality: '',
  });

  const navigate = useNavigate();

  // Validation function
  const validateField = (name, value) => {
    let fieldError = "";

    if (!value.trim()) {
      fieldError = `${name.replace("_", " ")} cannot be empty.`;
    }

    switch (name) {
      case "first_name":
        if (/\d/.test(value)) {
          fieldError = "First name cannot contain numbers.";
        } else if (/\W/.test(value)) {
          fieldError = "First name cannot contain special characters.";
        } else if (/\s/.test(value)) {
          fieldError = "First name cannot contain spaces.";
        } else if (value.length > MAX_NAME_LENGTH) {
          fieldError = `First name cannot exceed ${MAX_NAME_LENGTH} characters.`;
        }
        break;

      case "last_name":
        if (/\d/.test(value)) {
          fieldError = "Last name cannot contain numbers.";
        } else if (/\W/.test(value)) {
          fieldError = "Last name cannot contain special characters.";
        } else if (/\s/.test(value)) {
          fieldError = "Last name cannot contain spaces.";
        } else if (value.length > MAX_NAME_LENGTH) {
          fieldError = `Last name cannot exceed ${MAX_NAME_LENGTH} characters.`;
        }
        break;

      case "age":
        if (value < 1 || value > 110) {
          fieldError = "Age must be between 1 and 110.";
        } else if (/\D/.test(value)) {
          fieldError = "Age must be a valid number between 1 and 110.";
        }
        break;

      case "speciality":
        if (value.length > MAX_SPECIALITY_LENGTH) {
          fieldError = `Speciality cannot exceed ${MAX_SPECIALITY_LENGTH} characters.`;
        } else if (/\W/.test(value)) {
          fieldError = "Speciality cannot contain special characters.";
        }
        break;

      case "department":
        if (/\d/.test(value)) {
          fieldError = "Department cannot contain numbers.";
        } else if (/\W/.test(value)) {
          fieldError = "Department cannot contain special characters.";
        } else if (/\s/.test(value)) {
          fieldError = "Department cannot contain spaces.";
        }
        break;

      default:
        break;
    }

    // Set the error for the specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Validate the field on change
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submitting
    Object.keys(doctor).forEach((field) => validateField(field, doctor[field]));

    // Check if there are any errors, if there are, do not submit
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    const newdoctor = await createdoctor(doctor);
    if (newdoctor) {
      navigate('/doctors');
    }
  };

  return (
    <Container>
      <Typography variant="h5">Add New doctor</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="first_name"
              value={doctor.first_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="last_name"
              value={doctor.last_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              value={doctor.age}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department"
              name="department"
              value={doctor.department}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.department}
              helperText={errors.department}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Speciality"
              name="speciality"
              value={doctor.speciality}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.speciality}
              helperText={errors.speciality}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Adddoctor;
