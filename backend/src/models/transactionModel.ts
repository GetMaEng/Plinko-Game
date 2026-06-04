import type { TransactionType, TransactionMethod } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";

const createTransaction = async(transactionId: string, method: TransactionMethod, type: TransactionType, amount: number, walletId: number) => {
    const transaction = await prisma.transaction.create({
        data: {
            transactionId: transactionId,
            method: method,
            type: type,
            amount: amount,
            walletId: walletId
        }
    });
    return transaction;
}

const getAllUserTransaction = async(walletId: number) => {
    const transaction = await prisma.transaction.findMany({
        where: {
            walletId: walletId
        }
    })
    return transaction;
}

export { createTransaction, getAllUserTransaction }