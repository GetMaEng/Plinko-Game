import type { TransactionType, TransactionMethod } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";

const createTransaction = async(transactionId: string, method: TransactionMethod, type: TransactionType, amount: number, userId: number) => {
    const transaction = await prisma.transaction.create({
        data: {
            transactionId: transactionId,
            method: method,
            type: type,
            amount: amount,
            userId: userId
        }
    });
    return transaction;
}

const getAllUserTransaction = async(userId: number) => {
    const wallet = await prisma.transaction.findMany({
        where: {
            userId: userId
        }
    })
    return wallet;
}

export { createTransaction, getAllUserTransaction }