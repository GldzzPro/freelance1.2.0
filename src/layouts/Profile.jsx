import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResponsiveAppBar from '../components/nav';
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import ListDividers from '../components/list';
import { useAuthContext } from '../hooks/useAuthContext';


function Profile() {


const auth = useAuthContext();



useEffect(()=>{
  
  
   console.log({auth} , "i want to see it here")
   console.log(jwt_decode(auth?.user?.access))

},[])

  return (
    <>
    <ResponsiveAppBar/>
    <div style={{ marginLeft : "50%" }}>Profile Page</div>
    <ListDividers  allData={jwt_decode(auth?.user?.access)}/>

    </>
   
  )
}

export default Profile