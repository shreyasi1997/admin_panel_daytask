import React, { useState } from 'react';
import './login.css';
import { Typography, InputAdornment, IconButton, TextField, Snackbar, Alert, Link as MuiLink, Button } from '@mui/material'; // Import Button here
import { Box } from '@mui/system';
import { colors, fonts_size } from '../../common/color';
import { Email as EmailIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../redux/allSlice/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      dispatch(loginSuccess(response.data.user));
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');

      setTimeout(() => {
        navigate('/register'); // Redirect to the register page after 3 seconds
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      dispatch(loginFailure(errorMessage));
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  return (
    <Box className='login-first'>
      <Box className='login-image-container'>
        <img src="/pic/reg_img.png" alt="Login" className='login-image' />
      </Box>
      <Box className='heading-para-login'>
        <Typography 
          sx={{
            fontSize: fonts_size.header,
            fontWeight: 'bold',
          }}
        >
          <span style={{ color: colors.rightPanelAdminPanel }}>Day</span>
          <span style={{ color: colors.loginpagecolor }}>Task</span>
        </Typography>
      </Box>
      <Box className='heading-second-login'>
        <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.header }}>
          Welcome Back!
        </Typography>
      </Box>
      <Box className='login-email'>
        <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
          Email Address
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            marginTop: '5px',
            '& .MuiInputBase-input': {
              paddingLeft: '56px', // Ensure space for the icon
              color: '#fff', // White text color
            },
            '& .MuiInputAdornment-root': {
              marginRight: '8px', // Adjust spacing between icon and text
            },
            '& .MuiOutlinedInput-root': {
              height: '58px',
              width: '356px',
              backgroundColor: '#455A64',
              '& input::placeholder': {
                color: '#fff', // White placeholder text color
              },
            },
          }}
        />
      </Box>

      <Box className='login-password'>
        <Typography sx={{ color: colors.rightPanelAdminPanel, fontSize: fonts_size.text }}>
          Password
        </Typography>
        <TextField
          type={showPassword ? 'text' : 'password'}
          fullWidth
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            marginTop: '5px',
            '& .MuiInputBase-input': {
              paddingLeft: '56px', // Ensure space for the icon
              color: '#fff', // White text color
            },
            '& .MuiInputAdornment-root': {
              marginRight: '8px', // Adjust spacing between icon and text
            },
            '& .MuiOutlinedInput-root': {
              height: '58px',
              width: '356px',
              backgroundColor: '#455A64',
              '& input::placeholder': {
                color: '#fff', // White placeholder text color
              },
            },
          }}
        />
      </Box>

      <Box className='login-button'>
        <Button fullWidth onClick={handleLogin} sx={{ height: '58px', backgroundColor: '#FED36A', color: '#fff' }}>
          Login
        </Button>
      </Box>

      <Typography sx={{ color: '#fff', fontSize: fonts_size.text, marginTop: '15px' }}>
        Don't have an account? 
        <MuiLink 
          component={RouterLink} 
          to="/register" 
          sx={{ color: colors.loginpagecolor, marginLeft: '5px', textDecoration: 'none' }}
        >
          Sign up
        </MuiLink>
      </Typography>

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

export default Login;
