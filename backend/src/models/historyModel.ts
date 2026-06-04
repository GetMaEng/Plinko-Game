import type { Status } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";

const createHistory = async(bet: number, multiple: string, amount: number, status: Status, walletId: number) => {
    const history = await prisma.history.create({
        data: {
            bet: bet,
            multiple: multiple,
            amount: amount,
            status: status,
            walletId: walletId
        }
    })
    return history;
}

const getAllUserHistory = async(walletId: number) => {
    const history = await prisma.history.findMany({
        where: {
            walletId: walletId
        }
    })
    return history;
}

export { createHistory, getAllUserHistory }