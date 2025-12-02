// src/components/doctorList.js

import React, { useEffect, useState } from 'react';
import { getdoctors, deletedoctor } from '../api';
import { Container, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    const fetchdoctors = async () => {
      const data = await getdoctors();
      setdoctors(data);
    };
    fetchdoctors();
  }, []);

  const handleDelete = async (id) => {
    const success = await deletedoctor(id);
    if (success) {
      setdoctors(doctors.filter((doctor) => doctor.id !== id));
    }
  };

  return (
    <Container align="center">
      <Button sx={{ m: 3 }} variant="contained" color="primary" component={Link} to="/add-doctor">
        Add doctor
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{`${doctor.first_name} ${doctor.last_name}`}</TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(doctor.id)}
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

export default DoctorList;
