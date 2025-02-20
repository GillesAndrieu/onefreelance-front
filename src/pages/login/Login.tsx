import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// Google auth
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
// Auth
import {useAuth} from "../../hooks";

export const Login = () => {
    const [profile, setProfile] = useState(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const { token, setToken } = useAuth();

    const responseMessage = (response: CredentialResponse) => {
        console.log(response)
        setToken(JSON.stringify(response));
        fetch(`${import.meta.env.VITE_API_URL}/v1/login`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${response.credential}`,
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                setProfile(json);
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };
    const errorMessage = (error: void) => {
        console.log(error);
    };

    useEffect(() => {
        if(profile && token) {
            localStorage.setItem("profile", JSON.stringify(profile))
            navigate("/", { replace: true });
        }
    }, [profile]);

    return(
        <>
        <h2>Login</h2>
            <GoogleLogin type={"standard"} theme={"outline"} size={"medium"} onSuccess={responseMessage} onError={errorMessage} />
        </>
    );
}