import {CredentialResponse, GoogleLogin} from "@react-oauth/google";

export default function Login() {

    const responseMessage = (response: CredentialResponse) => {
        localStorage.setItem("token", JSON.stringify(response));
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
                localStorage.setItem("profile", json);
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };
    const errorMessage = (error: void) => {
        console.log(error);
    };

    return(
        <>
        <h2>Login</h2>
            <GoogleLogin type={"standard"} theme={"outline"} size={"medium"} onSuccess={responseMessage} onError={errorMessage} />
        </>
    );
}