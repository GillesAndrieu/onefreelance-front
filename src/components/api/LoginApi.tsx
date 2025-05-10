import {CredentialResponse} from "@react-oauth/google";

export async function fetchGetProfile(token: CredentialResponse) {

    return await fetch(`${import.meta.env.VITE_API_URL}/v1/login`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${token.credential}`,
            Accept: 'application/json',
            ContentType: 'application/json'
        }
    });
}