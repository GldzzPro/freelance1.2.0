import React from 'react'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { endpointsURL } from '../api/endpoints';

export const ManageProject = () => {
    const [projects, setProjects] = React.useState({})
    const  auth  = useAuthContext();
    console.log({auth});
        
    const navigate = useNavigate();
    React.useEffect(() => {
            async function fetchData() {
              const response = await axios.get('http://127.0.0.1:8000/projects/project-created/',
              { headers: { 
                'Content-Type': 'application/json' ,
                  "Authorization" : `Bearer ${auth?.user?.access}`} });
              console.log("azzz",response.data);
            }
          
            fetchData();
          }, []);
        
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
         {/* {projects.map((project) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h2">
                                    {project.name}
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    {project.description}
                                </Typography>
                                <button onClick={()=> navigate(`editProject/${project.id}`)}>
                                    {project.description}
                                </button>
                        </Grid>
                    </Grid>
                    )})} */}
                    </Grid>


    )
}

