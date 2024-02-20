import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  const [education, setEducation] = useState(false);
  const [funds, setFunds] = useState(false);
  const [accomodation, setAccomodation] = useState(false);
  const [clothes, setClothes] = useState(false);
  const [medicalSupplies, setMedicalSupplies] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);

  const needsMap = [
    { name: 'Education', getter: education, setter: setEducation },
    { name: 'Poverty', getter: funds, setter: setFunds },
    { name: 'Accomodation', getter: accomodation, setter: setAccomodation },
    { name: 'Clothes', getter: clothes, setter: setClothes },
    { name: 'Medical Supplies', getter: medicalSupplies, setter: setMedicalSupplies },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Description', description);

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

  const handleNeedChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setNeeds((prevNeeds) => {
      if (isChecked) {
        return [...prevNeeds, name];
      }
      return prevNeeds.filter((need) => need !== name);
    });
  };

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography variant="h3" gutterBottom>
              Register
            </Typography>
          </div>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="h5" gutterBottom>
              Needs supported:
            </Typography>
          </div>
          <div>
            <FormGroup>
              {needsMap.map((need) => (
                <FormControlLabel
                  key={need.name}
                  control={(
                    <Checkbox
                      checked={needs.includes(need.name)}
                      onChange={handleNeedChange(need.name)}
                      color="primary"
                    />
              )}
                  label={need.name}
                />
              ))}
            </FormGroup>
          </div>
          <Button variant="contained" color="success" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Register;
