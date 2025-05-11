import {AddressType} from "./AddressType.ts";

export interface ClientType {
    id: string,
    name: string,
    siret: string,
    referent: string,
    address: AddressType,
    create_at: string,
    update_at: string
}