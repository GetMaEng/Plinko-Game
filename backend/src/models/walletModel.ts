import prisma from "../lib/prisma.js";

const createWallet = async(userId: number) => {
    const wallet = await prisma.wallet.create({
        data: {
            userId: userId
        }
    })
    return wallet;
}

const getWalletId = async(userId: number) => {
    const wallet = await prisma.wallet.findFirst({
        where: {
            userId: userId
        }
    })
    return wallet;
}

const getUserWallet = async(walletId: number, userId: number) => {
    const wallet = await prisma.wallet.findUnique({
        where: {
            walletId: walletId,
            userId: userId
        }
    })
    return wallet;
}

const updateBalance = async(walletId: number, userId: number, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            walletId: walletId
        },
        data: {
            balance: amount
        }
    })
    return wallet;
}

const updateTotalEarning = async(walletId: number, userId: number, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            walletId: walletId
        },
        data: {
            totalEarning: amount
        }
    })
    return wallet;
}

const updateTotalDeposit = async(walletId: number, userId: number, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            walletId: walletId
        },
        data: {
             totalDeposit : amount
        }
    })
    return wallet;
}

const updateHighestProfit  = async(walletId:number, userId: number, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            walletId: walletId
        },
        data: {
             highestProfit: amount
        }
    })
    return wallet;
}

export { createWallet, getWalletId, getUserWallet, updateBalance, updateHighestProfit, updateTotalDeposit, updateTotalEarning }