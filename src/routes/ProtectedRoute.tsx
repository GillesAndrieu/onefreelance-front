import {Navigate, Outlet} from "react-router-dom";
// Auth
import {useAuth} from "../hooks";

export const ProtectedRoute = () => {
    const { token } = useAuth();
    if (!token) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};