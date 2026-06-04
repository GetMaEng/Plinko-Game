export interface Transaction {
    amount: string
    method: string
    time: string
    transactionId: string
    type: "deposit" | "withdraw"
    walletId: number
}