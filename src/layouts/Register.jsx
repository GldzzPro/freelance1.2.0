
import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from '../api/axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const REGISTER_URL = 'api/register/';
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [companyNames , setCompanyNames] = useState(['google','netflix','facebook'])


  useEffect(() => {
    // const response = axios.get(FETCH_COMPANYNAMES);
    // if (response) {
    //   setCompanyNames(response.data);
    // } else {
    //   console.log('Registration Failed')
    // }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username: user, email: email, first_name: firstname, last_name: lastname, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },

        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      setUser('');
      setPwd('');
      setMatchPwd('');
      setfirstname('');
      setlastname('');
      setEmail('');
      navigate('/login', { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed')
      }

    }
  }

  return (
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={user}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              value={firstname}
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="firstname Address"
              name="firstname"
              autoComplete="firstname"
              onChange={(e) => setfirstname(e.target.value)}
            />
            <TextField
              value={lastname}
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="lastname Address"
              name="lastname"
              autoComplete="lastname"
              onChange={(e) => setlastname(e.target.value)}
            />
            <TextField
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              value={pwd}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
            />
            <TextField
              value={matchPwd}
              margin="normal"
              required
              fullWidth
              name="vaildate password"
              label="vaildate password"
              type="password"
              id="vaildate password"
              autoComplete="current-vaildate password"
              onChange={(e) => setMatchPwd(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">companyName</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyName}
                label="Age"
                onChange={handleChange}
              >
                {companyNames.map(name => <MenuItem value={10}>{name}</MenuItem>)}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Sign Up</Button>
            <Grid container>
              <Grid item xs>
                {
                  <Link to="/login" >
                    Already Have an account Sign In ?
                  </Link>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
