import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
// Material ui
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
// Google auth
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
// Auth
import {useAuth} from "../../hooks";
// Type
import {ProfileType} from "../../components/types/ProfileType.ts";

export const Login = () => {
    const [profile, setProfile] = useState<ProfileType>();
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
                // @ts-ignore
                const decodedToken:any = jwtDecode(response.credential);
                let p:ProfileType = { name: decodedToken.name,
                        email: decodedToken.email,
                        picture: decodedToken.picture,
                        roles: json.roles};
                setProfile(p);
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