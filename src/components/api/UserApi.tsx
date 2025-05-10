import {UserType} from "../types/UserType.ts";

export async function fetchGetUsers():Promise<UserType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetUser(id: string):Promise<UserType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
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
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(userType)
    }).then(response => response.json());
}

export async function fetchUpdateUser(userType: UserType, id: string):Promise<UserType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(userType)
    }).then(response => response.json());
}

export async function fetchDeleteUser(id: string):Promise<number> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/customer/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.status);
}