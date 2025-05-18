import {CalculatedType} from "./CalculatedType.ts";
import {ContractType} from "./ContractType.ts";
import {ClientType} from "./ClientType.ts";

export interface ReportType {
    id: string,
    client_id: string,
    contract_id: string,
    month: number,
    year: number,
    billed_month: number,
    billed_year: number,
    billed: boolean,
    activity: any,
    bonus: number,
    calculated: CalculatedType,
    client: ClientType,
    contract: ContractType,
    create_at: string,
    update_at: string
}