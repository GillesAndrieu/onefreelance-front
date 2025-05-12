import {Navigate} from "react-router-dom";
import {jwtDecode, JwtPayload} from "jwt-decode";

function isExpired(token:any) {
    if(token === undefined || token === "" || token === null) {
        return true;
    }
    const decodedToken:JwtPayload = jwtDecode(token);
    const currentDate = new Date();

    // @ts-ignore
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.setItem("token", "");
        localStorage.setItem("profile", "");
        return true;
    } else {
        return false;
    }

}

export function AuthWrapper ({ children }:{ children: React.ReactNode})  {

    return isExpired(localStorage.getItem('token'))
        ? <Navigate to="/login" replace />
        : <>{children}</>;
}