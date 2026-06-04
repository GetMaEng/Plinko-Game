import type { Context } from "hono";
import * as historyModel from "../models/historyModel.js"

const createHistory = async (c: Context) => {
    try {
        const { bet, multiple, amount, status, walletId } = await c.req.json();
        
        const history = await historyModel.createHistory(bet, multiple, amount, status, walletId);

        return c.json(
            {
                success: true,
                msg: `Create history - Bet: ${bet}, Amount: ${amount}, status: ${status}`,
                data: history
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

const getAllUserHistory = async (c: Context) => {
    try {
        const walletId = Number(c.req.param());

        const histories = await historyModel.getAllUserHistory(walletId);

        return c.json(
            {
                success: true,
                msg: `All histories of wallet ID ${walletId}`,
                data: histories
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

export { createHistory, getAllUserHistory }