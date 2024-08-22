import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, Snackbar, Alert } from '@mui/material';
import { colors, fonts_size } from '../../common/color';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'normal_user',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
       setTimeout(() => {
      navigate('/login'); // Redirect to the register page after 3 seconds
    }, 3000); 
    } catch (error) {
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  return (
    <Box className="register-first">
      <Box className="register-image-container">
        <img src="/pic/reg_img.png" alt="Register" className="register-image" />
      </Box>
      <Box className="heading-para-register">
        {/* <Typography 
          sx={{
            fontSize: fonts_size.header,
            fontWeight: 'bold',
          }}
        >
          <span style={{ color: colors.rightPanelAdminPanel }}>Day</span>
          <span style={{ color: colors.loginpagecolor }}>Task</span>
        </Typography> */}
      </Box>
      {/* <Box className="heading-second-register">
        <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.header }}>
          Create an Account
        </Typography>
      </Box> */}
      <form onSubmit={handleSubmit} className="form-container-register">
        <Box className="register-username" sx={{marginTop:'-20px'}}>
          <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
            Username
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{
              marginTop: '5px',
              '& .MuiInputBase-input': {
                paddingLeft: '56px',
                color: '#fff',
              },
              '& .MuiInputAdornment-root': {
                marginRight: '8px',
              },
              '& .MuiOutlinedInput-root': {
                height: '58px',
                width: '356px',
                backgroundColor: '#455A64',
                '& input::placeholder': {
                  color: '#fff',
                },
              },
            }}
          />
        </Box>
        <Box className="register-email">
          <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              marginTop: '5px',
              '& .MuiInputBase-input': {
                paddingLeft: '56px',
                color: '#fff',
              },
              '& .MuiInputAdornment-root': {
                marginRight: '8px',
              },
              '& .MuiOutlinedInput-root': {
                height: '58px',
                width: '356px',
                backgroundColor: '#455A64',
                '& input::placeholder': {
                  color: '#fff',
                },
              },
            }}
          />
        </Box>
        <Box className="register-password">
          <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
            Password
          </Typography>
          <TextField
            type="password"
            fullWidth
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{
              marginTop: '5px',
              '& .MuiInputBase-input': {
                paddingLeft: '56px',
                color: '#fff',
              },
              '& .MuiInputAdornment-root': {
                marginRight: '8px',
              },
              '& .MuiOutlinedInput-root': {
                height: '58px',
                width: '356px',
                backgroundColor: '#455A64',
                '& input::placeholder': {
                  color: '#fff',
                },
              },
            }}
          />
        </Box>
        <Box className="register-role">
          <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
            Role
          </Typography>
          <FormControl fullWidth sx={{ marginTop: '5px' }}>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                backgroundColor: '#455A64',
                color: '#fff',
                '& .MuiInputBase-input': {
                  paddingLeft: '16px',
                },
              }}
            >
              <MenuItem value="super_admin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="normal_user">Normal User</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="register-button" onClick={handleSubmit}>
          <Typography sx={{ color: '#fff', fontSize: fonts_size.text }}>Register</Typography>
        </Box>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Registration;
