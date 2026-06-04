import type { Context } from "hono";
import * as transactionModel from "../models/transactionModel.js"

const createTransaction = async (c: Context) => {
    try {
        const { transactionId, method, type, amount, walletId } = await c.req.json();

        const transaction = await transactionModel.createTransaction(transactionId, method, type, amount, walletId);

        return c.json(
            {
                sucess: true,
                msg: `Create transaction at ID - ${transactionId}, amount - ${amount}`,
                data: transaction
            },
            200
        );
    } catch (e) {
        return c.json(
            {
                success: false,
                msg: `${e}`,
            },
            500
        )
    }
}

const getAllUserTransaction = async (c: Context) => {
    try {
        const walletId = Number(c.req.param("walletId"));

        const transaction = await transactionModel.getAllUserTransaction(walletId);

        return c.json(
            {
                sucess: true,
                msg: `All transaction of this wallet ID ${walletId}`,
                data: transaction
            },
            200
        );
    } catch (e) {
        return c.json(
            {
                success: false,
                msg: `${e}`,
            },
            500
        )
    }
}

export { createTransaction, getAllUserTransaction }