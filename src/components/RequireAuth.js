import { useLocation, Navigate, Outlet ,useOutletContext} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

const RequireAuth = () => {
    const auth  = useAuthContext();
    const location = useLocation();
    console.log({auth} , "required")
    
     
   

    return (
        auth.user ? <Outlet />
                   : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;