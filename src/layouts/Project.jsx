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
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/nav';
import { FormControlLabel , Checkbox} from '@mui/material';

import dayjs from 'dayjs';
import { useAuthContext } from '../hooks/useAuthContext';
const APPLICATION_URL = 'projects/project-create/';
const theme = createTheme();
function Project() {


const auth = useAuthContext();
const navigate = useNavigate()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [delievery_service , setDelieveryService] = useState("no") ;


useEffect(()=>{
   console.log(jwt_decode(auth?.user?.access))

},[])

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({auth} , "i want to see it here")
    console.log({auth} , "i want to see it here")

    const body = jwt_decode(auth?.user?.access).user_type[0] === "customer"  ? {  title  , description , delievery_service } : null 
   console.log("applicated");
   console.log({body});
    try {
        const response = await axios.post(APPLICATION_URL , 
            JSON.stringify(body),
            { headers: { 
                'Content-Type': 'application/json' ,
                  "Authorization" : `Bearer ${auth?.user?.access}`} }
).then((response) => {
console.log(response)
navigate(`/`, {replace : true})
}) ;      
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 409) {
            console.log('Username Taken');
        } else {
            console.log('Registration Failed')
        }

        console.log(err);
        
    }
}

  return (
    <>
    <div style={{ marginLeft : "50%" }}>project Page</div>
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
            create project
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              value={title}
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
               console.log({auth} , "i want to see it here")

            {jwt_decode(auth?.user?.access).user_type[0] === "customer"  ? <FormControlLabel control={<Checkbox checked={ delievery_service==="no" ? false : true } onChange={(e)=>{e.target.checked ? setDelieveryService("yes") : setDelieveryService("no") }} />} label="delivery service" /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >create project</Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    </>
   
  )
}

export default Project


