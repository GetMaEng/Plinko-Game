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
        const walletId = Number(c.req.param("walletId"));

        if (!walletId || isNaN(walletId)) {
            return c.json({ success: false, msg: "Invalid walletId" }, 400);
        }

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

const getRecentBigWins = async (c: Context) => {
    try {
        const limit = parseInt(c.req.query('limit') || '3');
        const data = await historyModel.getRecentBigWins(limit);
        return c.json({ success: true, data }, 200);
    } catch (e) {
        console.error('getRecentBigWins error:', e);
        return c.json({ success: false, error: `${e}` }, 500);
    }
};
export { createHistory, getAllUserHistory, getRecentBigWins }