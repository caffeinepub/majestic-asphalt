import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type QuoteId = bigint;
export interface QuoteRequest {
    id: QuoteId;
    serviceType: ServiceType;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum ServiceType {
    lineStriping = "lineStriping",
    sealcoating = "sealcoating",
    parkingLotPaving = "parkingLotPaving",
    asphaltRepair = "asphaltRepair",
    drivewayPaving = "drivewayPaving"
}
export interface backendInterface {
    getAllQuoteRequests(): Promise<Array<QuoteRequest>>;
    submitQuoteRequest(name: string, phone: string, email: string, serviceTypeText: string, message: string): Promise<void>;
}
