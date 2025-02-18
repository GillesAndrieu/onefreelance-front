import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks";

export const ProtectedRoute = ({ children }:{ children: React.ReactNode}) => {
    const { user } = useAuth();
    console.log(user, "user");
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};