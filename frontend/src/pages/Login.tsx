/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Send request to login endpoint with email and password
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login successful, navigate to the home route
        navigate('/');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div>
      <Box display="flex" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography variant="h3" gutterBottom>
              Login
            </Typography>
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email/Username "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" color="success" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Login;
