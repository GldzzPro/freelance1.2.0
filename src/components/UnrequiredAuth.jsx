import { useLocation, Navigate, Outlet ,useOutletContext} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

const UnrequiredAuth = () => {
    const  auth  = useAuthContext();
    const location = useLocation();
     console.log({auth})
     
    return (
        auth.user ? <Navigate to="/" state={{ from: location }} replace /> 
                   : <Outlet />
    );
}

export default UnrequiredAuth;