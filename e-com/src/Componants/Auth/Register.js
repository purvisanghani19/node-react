import React, { useEffect, useState } from 'react';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const theme = createTheme();
  const navigate = useNavigate();

  const [Register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  })


  const handlerrgister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...Register, [name]: value });
  }

  const registerapi = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post('http://localhost:5000/register', Register);
      result = result.data;

      localStorage.setItem('userdata',JSON.stringify(result));
      if(result){
        navigate("/")
      }

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    const auth = localStorage.getItem('userdata');
    if(auth){
      navigate("/")
    }
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    name="name"
                    value={Register.username}
                    onChange={handlerrgister}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    name="email"
                    value={Register.email}
                    onChange={handlerrgister}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={Register.password}
                    onChange={handlerrgister}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="By continuing, you agree to our Conditions of Use and Privacy Notice."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={registerapi}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" variant="body2">Already have an account? Sign in</NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Register;
