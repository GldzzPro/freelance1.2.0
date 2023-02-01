import React ,{    useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate , useParams} from 'react-router-dom';
import axios from '../api/axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MaterialUIPickers from '../components/datePicker';
import dayjs from 'dayjs';
import { useAuthContext } from '../hooks/useAuthContext';
const UPDATE_URL = 'api/register/';
const theme = createTheme();
export  default function  List({allData , user_type}) {

  useEffect(
    () => {
      console.log(allData)
    },[])
    
    const navigate = useNavigate();
    
  const [username, setUser] = useState(allData.username[0]);
	const [firstname, setfirstname] = useState(allData.first_name[0]);
	const [lastname, setlastname] = useState(allData.last_name[0]);
	const [email, setEmail] = useState(allData.email[0]);
  
    

    // const [birthDay, setBirthDay] = useState(dayjs('2014-08-18T21:11:54'));
    // const handleChange = (newValue) => {
    //     setBirthDay(newValue);
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
		console.log("submitted");
        try {
            const response = await axios.post(UPDATE_URL,
                JSON.stringify({ username , email  , first_name : firstname, last_name : lastname  }),
                {
                    headers: { 'Content-Type': 'application/json' },
                   
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            //clear state and controlled inputs
            navigate('/', { replace : true });
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            update profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              value={username}
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
              label="firstname"
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
              label="lastname"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >update Profile</Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
