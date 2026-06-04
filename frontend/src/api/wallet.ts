import { Axios } from "../lib/axios";

export const createWallet = async(userId: number) => {
    try {
        await Axios.post(`/wallet/${userId}`);
        return {
            status: 200,
            success: true,
            msg: `Create a wallet of user ID ${userId} successfully.`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getWalletId = async (userId: number) => {
    try {
        const response = await Axios.get(`/wallet/walletId/${userId}`);
        return {
            status: 200,
            success: true,
            msg: `This is your wallet ID ${response.data.data.walletId}.`,
            data: response.data.data.walletId
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getUserWallet = async (walletId: number, userId: number) => {
    try {
        const response = await Axios.get(`/wallet/${walletId}/${userId}`);
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

export const updateBalance = async (walletId: number, userId: number, amount: number) => {
    try {
        await Axios.patch("/wallet/balance", {
            walletId: walletId,
            userId: userId,
            amount: amount
        });
        return {
            status: 200,
            success: true,
            msg: `Update balance of user ID ${userId}`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const updateTotalEarning = async (walletId: number, userId: number, amount: number) => {
    try {
        await Axios.patch("/wallet/earning", {
            walletId: walletId,
            userId: userId,
            amount: amount
        });
        return {
            status: 200,
            success: true,
            msg: `Update total earning of user ID ${userId}`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const updateTotalDeposit = async (walletId: number, userId: number, amount: number) => {
    try {
        await Axios.patch("/wallet/deposit", {
            walletId: walletId,
            userId: userId,
            amount: amount
        });
        return {
            status: 200,
            success: true,
            msg: `Update total deposit of user ID ${userId}`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const updateHighestProfit = async (walletId: number, userId: number, amount: number) => {
    try {
        await Axios.patch("/wallet/profit", {
            walletId: walletId,
            userId: userId,
            amount: amount
        });
        return {
            status: 200,
            success: true,
            msg: `Update the highest profit of user ID ${userId}`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}