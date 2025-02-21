import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// Material ui
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
// Google auth
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
// Auth
import {useAuth} from "../../hooks";
import Alert from "@mui/material/Alert";

export const Login = () => {
    const [profile, setProfile] = useState(localStorage.getItem("profile"));
    const [ errorRender, setErrorRender ] = useState(false);
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const responseMessage = (response: CredentialResponse) => {
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
            .catch(() => {
                setErrorRender(true);
                setToken(null);
            });
    };
    const errorMessage = () => {
        setToken(null);
        setErrorRender(true);
    };

    useEffect(() => {
        if(profile && token) {
            localStorage.setItem("profile", JSON.stringify(profile))
            navigate("/", { replace: true });
        }
    }, [profile]);

    return(
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">OneFreelance</Typography>
            {errorRender &&
                <Alert severity="error">
                    You are not authorize to access the website.
                </Alert>
            }
            <GoogleLogin type={"standard"} theme={"filled_blue"} size={"large"} onSuccess={responseMessage} onError={errorMessage} />
        </Box>
    );
}