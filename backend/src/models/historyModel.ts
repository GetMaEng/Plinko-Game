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

const getRecentBigWins = async (limit: number) => {
    const wins = await prisma.history.findMany({
        where: { status: 'profit' },
        orderBy: { time: 'desc' },
        take: limit,
        include: {
            wallet: {
                include: {
                    user: true
                }
            }
        }
    });

    return wins.map((entry) => ({
        username:   entry.wallet.user.username,
        game:       'PLINKO',
        multiplier: entry.multiple,
        profit: Number(entry.amount) - Number(entry.bet),
    }));
}

export { createHistory, getAllUserHistory, getRecentBigWins }
