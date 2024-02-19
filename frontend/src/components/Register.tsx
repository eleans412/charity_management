import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  const [education, setEducation] = useState(false);
  const [poverty, setPoverty] = useState(false);
  const [needs, setNeeds] = useState([]);

  const needsMap = [
    { name: 'Education', getter: education, setter: setEducation },
    { name: 'Poverty', getter: poverty, setter: setPoverty },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Send request to Register endpoint with email and password
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password, description, needs,
        }),
      });

      if (response.ok) {
        // If Register successful, navigate to the home route
        navigate('/');
      } else {
        // Handle Register failure
        console.error('Register failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Email "
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
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
        </div>
        <Button variant="contained" color="success" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
