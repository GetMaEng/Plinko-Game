import { Axios } from "../lib/axios";
export type Status = "profit" | "loss";

export const createHistory = async (bet: number, multiple: string, amount: number, status: Status, walletId: number) => {
    try {
        await Axios.post(`/history`, {
            bet: bet,
            multiple: multiple,
            amount: amount,
            status: status,
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

export const getAllUserHistory = async (walletId: number) => {
    try {
        const response = await Axios.get(`/history/${walletId}`);
        return {
            status: 200,
            success: true,
            data: response.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}