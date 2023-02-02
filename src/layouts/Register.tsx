
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { endpointsURL } from '../api/endpoints';
// const REGISTER_URL = 'api/register/';
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [companyNames, setCompanyNames] = useState(['google', 'netflix', 'facebook']) /// TODO: change it to useState([])
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState<'customer' | 'supplier' | null>(null);
  const [isNewCompany, setisNewCompany] = useState(false);

  useEffect(() => {
    //unComment this for gettings compqny names from the server
    //const response = axios.get(endpointsURL.companyNames);
    //if (response) {
    //   setCompanyNames(response.data);
    // } else {
    //  catch the error
    //   console.log('Registration Failed')
    // }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const response = await axios.post(endpointsURL.register,
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
            <FormControlLabel control={<Checkbox 
            checked={ isNewCompany ? false : true } 
            onChange={()=>setisNewCompany(prev => !prev)} />
            }label="create new company" />
            {
            isNewCompany ? <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">companyName</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyName}
                label="companyName"
                onChange={(e) => setCompanyName(e.target.value)}
              >
                {companyNames.map(name => <MenuItem value={name}>{name}</MenuItem>)}
              </Select>
            </FormControl> : 
            <>
            <TextField
              value={companyName}
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="companyName"
              name="companyName"
              autoComplete="companyName"
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">companyType</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyType}
                label="companyType"
                onChange={(e) => setCompanyType(e.target.value as 'customer' | 'supplier' | null)}
              >
                <MenuItem value={'customer'}>customer</MenuItem>
                <MenuItem value={'supplier'}>supplier</MenuItem>
              </Select>
            </FormControl>
            </>
            }
            
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
