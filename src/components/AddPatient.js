import React, { useState } from 'react';
import { createPatient, uploadPatientImages } from '../api'; // Import the functions
import { Container, TextField, Button, Grid, Typography, Box, CircularProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const AddPatient = () => {
  const [patient, setPatient] = useState({
    first_name: '',
    last_name: '',
    age: '',
    location: '',
    problem: '',
  });

  const [images, setImages] = useState([]); // To store selected images
  const [imagePreviews, setImagePreviews] = useState([]); // To store image preview URLs
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    age: '',
    location: '',
    problem: '',
  });
  const [loading, setLoading] = useState(false); // Loading state for the form submission
  const [imageError, setImageError] = useState('');
  const [imageFeedback, setImageFeedback] = useState(''); // To show the feedback on selected images
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar for success message
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Validation function
  const validate = (name, value) => {
    let formErrors = { ...errors };

    if (name === 'first_name') {
      if (!value || /\W|\d|\s/.test(value)) {
        formErrors.first_name = 'First name must not be empty and cannot contain special characters or spaces.';
      } else if (value.length > 50) { // Max length can be changed as per DB schema
        formErrors.first_name = 'First name exceeds maximum length of 50 characters.';
      } else {
        formErrors.first_name = '';
      }
    }

    // if (name === 'last_name') {
    //   if (!value || /\W|\d|\s/.test(value)) {
    //     formErrors.last_name = 'Last name must not be empty and cannot contain special characters or spaces.';
    //   } else if (value.length > 50) { // Max length can be changed as per DB schema
    //     formErrors.last_name = 'Last name exceeds maximum length of 50 characters.';
    //   } else {
    //     formErrors.last_name = '';
    //   }
    // }

    if (name === 'age') {
      if (!value || isNaN(value) || value < 1 || value > 100) {
        formErrors.age = 'Age must be a number between 1 and 100.';
      } else {
        formErrors.age = '';
      }
    }

    if (name === 'location') {
      if (!value || /\W|\d/.test(value)) {
        formErrors.location = 'Location must not be empty and cannot contain special characters or numbers.';
      } else if (value.length > 100) { // Max length can be changed as per DB schema
        formErrors.location = 'Location exceeds maximum length of 100 characters.';
      } else {
        formErrors.location = '';
      }
    }

    // if (name === 'problem') {
    //   if (!value || /\W|\d/.test(value)) {
    //     formErrors.problem = 'Problem must not be empty and cannot contain special characters or numbers.';
    //   } else if (value.length > 200) { // Max length can be changed as per DB schema
    //     formErrors.problem = 'Problem description exceeds maximum length of 200 characters.';
    //   } else {
    //     formErrors.problem = '';
    //   }
    // }

    setErrors(formErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validate(name, value);
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;

    // Validate number of images selected
    if (selectedFiles.length > 5) {
      setImageError('You can upload a maximum of 5 images.');
      setImageFeedback('');
      setImagePreviews([]);
      return;
    }

    // Clear error and show feedback about selected files
    setImageError('');
    setImages(selectedFiles);

    // Generate preview URLs for selected images
    const previews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
    const fileNames = Array.from(selectedFiles).map((file) => file.name);
    setImageFeedback(`Selected files: ${fileNames.join(', ')}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).every((error) => error === '')) {
      setLoading(true);
      try {
        // Create patient first
        const newPatient = await createPatient(patient);
        if (newPatient && newPatient.id) {
          // If patient creation is successful, upload images
          const formData = new FormData();
          for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]); // Append each image to the form data
          }

          if(images.length > 0){
            await uploadPatientImages(newPatient.id, formData); // Upload the images
          }

          setSnackbarMessage('Patient created successfully!');
          setOpenSnackbar(true);
          navigate('/patients');
        }
      } catch (error) {
        console.error('Error creating patient or uploading images:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setImageError('Please fill in all required fields and upload at least one image.');
    }
  };

  return (
    <Container align="center" >
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Add New Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField sx={{ mt: 3 }}
              label="First Name"
              name="first_name"
              value={patient.first_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
            <TextField
              label="Last Name"
              name="last_name"
              value={patient.last_name}
              onChange={handleChange}
              fullWidth
              
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              value={patient.age}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={patient.location}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Problem"
              name="problem"
              value={patient.problem}
              onChange={handleChange}
              fullWidth
              error={!!errors.problem}
              helperText={errors.problem}
            />
          </Grid>

          {/* Image Upload Section */}
          <Grid item xs={12} sx={{ m: 3 }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span" fullWidth>
                Upload Images (Max 5)
              </Button>
            </label>
            {imageError && <Typography color="error">{imageError}</Typography>}
            {imageFeedback && <Typography>{imageFeedback}</Typography>}
          </Grid>

          {/* Thumbnails of selected images */}
          {imagePreviews.length > 0 && (
            <Grid item xs={12}>
              <Box display="flex" flexWrap="wrap" gap={2} sx={{ m: 3 }}>
                {imagePreviews.map((preview, index) => (
                  <Box key={index} width="100px" height="100px" position="relative">
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Submit Button */}
        <Button  type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>

      {/* Snackbar for success */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddPatient;
