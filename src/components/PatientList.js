// // src/components/PatientList.js

// import React, { useEffect, useState } from 'react';
// import { getPatients, deletePatient } from '../api';
// import { Container, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import { Link } from 'react-router-dom';

// const PatientList = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deletingPatientId, setDeletingPatientId] = useState(null);  // Store the ID of the patient being deleted
//   const [openDialog, setOpenDialog] = useState(false); // Control dialog visibility
//   const [error, setError] = useState(null);

//   // Fetch patients
//   useEffect(() => {
//     const fetchPatients = async () => {
//       setLoading(true);
//       try {
//         const data = await getPatients();
//         setPatients(data);
//       } catch (error) {
//         setError("Failed to fetch patients.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPatients();
//   }, []);

//   // Handle delete request
//   const handleDelete = async () => {
//     if (deletingPatientId) {
//       const success = await deletePatient(deletingPatientId);
//       if (success) {
//         setPatients(patients.filter((patient) => patient.id !== deletingPatientId));
//       } else {
//         setError("Failed to delete the patient.");
//       }
//       setOpenDialog(false);
//       setDeletingPatientId(null);  // Reset the patient ID after deletion attempt
//     }
//   };

//   // Open confirmation dialog
//   const openDeleteDialog = (id) => {
//     setDeletingPatientId(id);
//     setOpenDialog(true);
//   };

//   // Close confirmation dialog
//   const closeDeleteDialog = () => {
//     setOpenDialog(false);
//     setDeletingPatientId(null);
//   };

//   return (
//     <Container>
//       <Button variant="contained" color="primary" component={Link} to="/add-patient">
//         Add Patient
//       </Button>
      
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Age</TableCell>
//                 <TableCell>Location</TableCell>
//                 <TableCell>Problem</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {patients.map((patient) => (
//                 <TableRow key={patient.id}>
//                   <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
//                   <TableCell>{patient.age}</TableCell>
//                   <TableCell>{patient.location}</TableCell>
//                   <TableCell>{patient.problem}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => openDeleteDialog(patient.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={closeDeleteDialog}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this patient?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDeleteDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default PatientList;


// src/components/PatientList.js

import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../api';
import { Container, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingPatientId, setDeletingPatientId] = useState(null);  // Store the ID of the patient being deleted
  const [openDialog, setOpenDialog] = useState(false); // Control dialog visibility
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        setError("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Handle delete request
  const handleDelete = async () => {
    if (deletingPatientId) {
      const success = await deletePatient(deletingPatientId);
      if (success) {
        setPatients(patients.filter((patient) => patient.id !== deletingPatientId));
      } else {
        setError("Failed to delete the patient.");
      }
      setOpenDialog(false);
      setDeletingPatientId(null);  // Reset the patient ID after deletion attempt
    }
  };

  // Open confirmation dialog
  const openDeleteDialog = (id) => {
    setDeletingPatientId(id);
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setDeletingPatientId(null);
  };

  return (
    <Container align="center">
      <Button sx={{ m: 3 }} variant="contained" color="primary" component={Link} to="/add-patient">
        Add Patient
      </Button>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} hover onClick={() => navigate(`/patients/${patient.id}`)}>
                  <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.location}</TableCell>
                  <TableCell>{patient.problem}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from firing
                        openDeleteDialog(patient.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this patient?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientList;
