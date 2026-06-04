import { Axios } from "../lib/axios";
type TransactionType = 'deposit' | 'withdraw';
type TransactionMethod = 'bank_transfer' | 'credit_card'| 'bitcoin'

export const createTransaction = async (transactionId: string, method: TransactionMethod, type: TransactionType, amount: number, walletId: number) => {
    try {
        await Axios.post(`/transaction`, {
            transactionId: transactionId,
            method: method,
            type: type,
            amount: amount,
            walletId: walletId
        });
        return {
            status: 200,
            success: true,
            msg: `Create a history of wallet ID ${walletId} successfully.`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getAllUserTransaction = async (walletId: number) => {
    try {
        const response = await Axios.get(`/transaction/${walletId}`);
        return {
            status: 200,
            success: true,
            data: response.data.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}