import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} =useAuth();
    const location = useLocation();
    
    return (
        auth?.role?.find(r=>allowedRoles?.includes(r)) //if any allowedRoles matches the roles of loggedin user
            ?<Outlet />
            : auth?.id
                ?<Navigate to="/unauthorized" state={{from : location}} replace />
                :<Navigate to="/" state={{from : location}} replace />
                
    )
}

export default RequireAuth