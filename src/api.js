// // src/api.js

// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000';

// // doctors API
// export const getdoctors = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/doctors/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const createdoctor = async (doctorData) => {
//   try {
//     const response = await axios.post(`${API_URL}/doctors/`, doctorData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const updatedoctor = async (id, doctorData) => {
//   try {
//     const response = await axios.put(`${API_URL}/doctors/${id}`, doctorData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const deletedoctor = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/doctors/${id}`);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// // Patients API
// export const getPatients = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/patients/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// // export const createPatient = async (patientData) => {
// //   try {
// //     const response = await axios.post(`${API_URL}/patients/`, patientData);
// //     return response.data;
// //   } catch (error) {
// //     console.error(error);
// //     return null;
// //   }
// // };

// export const updatePatient = async (id, patientData) => {
//   try {
//     const response = await axios.put(`${API_URL}/patients/${id}`, patientData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const deletePatient = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/patients/${id}`);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// export const getTreatments = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/treatments/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const createTreatment = async (treatmentData) => {
//   try {
//     const response = await axios.post(`${API_URL}/treatments/`, treatmentData);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const deleteTreatment = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/treatments/${id}`);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// // Function to create a new patient
// export const createPatient = async (patient) => {
//   try {
//     const response = await axios.post(`${API_URL}/patients/`, patient);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating patient:", error);
//   }
// };

// // Function to upload images for a patient
// export const uploadPatientImages = async (patientId, formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/patients/${patientId}/upload-images/`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading images:", error);
//   }
// };


// src/api.js

import axios from 'axios';

// const API_URL = 'http://127.0.0.1:5000';

const API_URL = 'http://3.80.126.80:5000';


export const VerifyUser = async (username,password) => {
  try {

    const response = await axios.post(`${API_URL}/login`,  new URLSearchParams({
      username,
      password
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Send data as x-www-form-urlencoded
      },});

    return response;

  } catch (error) {
    console.error("Error logging in:", error);
  }
};


// doctors API
export const getdoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctors/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createdoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/`, doctorData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatedoctor = async (id, doctorData) => {
  try {
    const response = await axios.put(`${API_URL}/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deletedoctor = async (id) => {
  try {
    await axios.delete(`${API_URL}/doctors/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Patients API
export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_URL}/patients/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch a single patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to update patient data
export const updatePatient = async (id, patientData) => {
  try {
    const response = await axios.put(`${API_URL}/patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to delete a patient
export const deletePatient = async (id) => {
  try {
    await axios.delete(`${API_URL}/patients/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Function to create a new patient
export const createPatient = async (patient) => {
  try {
    const response = await axios.post(`${API_URL}/patients/`, patient);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
  }
};

// Function to upload images for a patient
export const uploadPatientImages = async (patientId, formData) => {
  try {
    const response = await axios.post(`${API_URL}/patients/${patientId}/upload-images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

// Fetch treatments for patients
export const getTreatments = async () => {
  try {
    const response = await axios.get(`${API_URL}/treatments/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Create a treatment for a patient
export const createTreatment = async (treatmentData) => {
  try {
    const response = await axios.post(`${API_URL}/treatments/`, treatmentData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to delete a treatment
export const deleteTreatment = async (id) => {
  try {
    await axios.delete(`${API_URL}/treatments/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const UploadImageForAnalysis = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/apply_models/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

export const sendFeedback = async (feedback) =>{
  try {

    // Send the feedback to the server via POST request
    const response = await axios.post(`${API_URL}/submit-feedback/`, { feedback });

    // If the response is successful, show an alert and disable feedback
    if (response.status === 200) {
      alert(response.data.message);
       // Disable further feedback submission
    } else {
      alert('There was an error submitting your feedback. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('There was an error submitting your feedback. Please try again.');
  }
};