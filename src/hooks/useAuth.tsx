import {createContext, useContext, useEffect, useMemo, useState} from "react";

const AuthContext = createContext('light');

export const AuthProvider = ({ children }:{ children: React.ReactNode}) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Function to set the authentication token
    const setToken = (newToken:any) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue:any = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth:any = () => {
    return useContext(AuthContext);
};