import prisma from "../lib/prisma.js";

const createHistory = async(bet: number, multiple: string, amount: number, userId: number) => {
    const history = await prisma.history.create({
        data: {
            bet: bet,
            multiple: multiple,
            amount: amount,
            userId: userId
        }
    })
    return history;
}

const getAllUserHistory = async(userId: number) => {
    const history = await prisma.history.findMany({
        where: {
            userId: userId
        }
    })
    return history;
}

export { createHistory, getAllUserHistory }