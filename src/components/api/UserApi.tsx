import {UserType} from "../types/UserType.ts";

export async function fetchGetUsers():Promise<UserType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${token.credential}`,
            Accept: 'application/json',
            ContentType: 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchCreateUser(userType: UserType):Promise<UserType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${token.credential}`,
            Accept: 'application/json',
            ContentType: 'application/json'
        },
        body: JSON.stringify(userType)
    }).then(response => response.json());
}