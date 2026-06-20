export type Status = "profit" | "loss";

export interface History {
    amount: number
    bet: number
    multiple: string
    status: Status
    time: string
}