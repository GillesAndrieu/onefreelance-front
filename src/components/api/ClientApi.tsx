import {ClientType} from "../types/ClientType.ts";

export async function fetchGetClients():Promise<ClientType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/client`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetClient(id: string):Promise<ClientType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/client/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchCreateClient(client: ClientType):Promise<ClientType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/client`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(client)
    }).then(response => response.json());
}

export async function fetchUpdateClient(client: ClientType, id: string):Promise<ClientType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/client/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(client)
    }).then(response => response.json());
}

export async function fetchDeleteClient(id: string):Promise<number> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/client/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.status);
}