import {ContractType} from "../types/ContractType.ts";

export async function fetchGetContracts():Promise<ContractType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/contract`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetContract(id: string):Promise<ContractType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/contract/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchCreateContract(contract: ContractType):Promise<ContractType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/contract`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(contract)
    }).then(response => response.json());
}

export async function fetchUpdateContract(contract: ContractType, id: string):Promise<ContractType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/contract/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(contract)
    }).then(response => response.json());
}

export async function fetchDeleteContract(id: string):Promise<number> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/contract/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.status);
}