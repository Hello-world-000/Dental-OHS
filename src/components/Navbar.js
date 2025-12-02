// src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Doctor Actions
        </Typography>
        <Button color="inherit" component={Link} to="/doctors">
          doctors
        </Button>
        <Button color="inherit" component={Link} to="/patients">
          Patients
        </Button>
        <Button color="inherit" component={Link} to="/treatments">
          Treatments
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
