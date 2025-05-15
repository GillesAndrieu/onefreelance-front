import {CalculatedType} from "./CalculatedType.ts";

export interface ReportType {
    id: string | null,
    client_id: string,
    contract_id: string,
    month: number,
    year: number,
    billed_month: number | null,
    billed_year: number | null,
    billed: boolean,
    activity: any,
    bonus: number,
    calculated: CalculatedType | null,
    create_at: string | null,
    update_at: string | null
}