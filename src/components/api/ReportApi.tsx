import {ReportType} from "../types/ReportType.ts";
import {ReportInputType} from "../types/ReportInputType.ts";

export async function fetchGetYears():Promise<number[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report/years`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetReportsByYear(year: number):Promise<ReportType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report/year/${year}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetReports():Promise<ReportType[]> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchGetReport(id: string):Promise<ReportType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.json());
}

export async function fetchCreateReport(report: ReportInputType):Promise<ReportType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(report)
    }).then(response => response.json());
}

export async function fetchUpdateReport(report: ReportInputType, id: string):Promise<ReportType> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(report)
    }).then(response => response.json());
}

export async function fetchDeleteReport(id: string):Promise<number> {
    const localToken:any = localStorage.getItem("token");
    const token:any = JSON.parse(localToken);
    return await fetch(`${import.meta.env.VITE_API_URL}/v1/report/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token.credential}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    }).then(response => response.status);
}