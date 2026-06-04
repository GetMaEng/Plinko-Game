import type { Context } from "hono";
import * as walletModel from "../models/walletModel.js"
import * as userModel from "../models/userModel.js";

const createWallet = async (c: Context) => {
    try {
        const userId = Number(c.req.param("userId"));
    
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }
        const wallet = await walletModel.createWallet(userId);

        return c.json(
            {
                success: true,
                msg: `Create wallet of user ID ${userId}`,
                data: wallet
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

const getWalletId = async (c: Context) => {
    try {
        const userId = Number(c.req.param("userId"));
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }

        const wallet = await walletModel.getWalletId(userId);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                succes: true,
                msg: "This is your wallet ID.",
                data: wallet
            }
        )
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

const getUserWallet = async (c: Context) => {
    try {
        const walletId = Number(c.req.param("walletId"));
        const userId = Number(c.req.param("userId"));
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }

        const wallet = await walletModel.getUserWallet(walletId, userId);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                success: true,
                msg: `This is wallet of user ID ${userId}`,
                data: wallet
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

const updateBalance = async (c: Context) => {
    try {
        const { walletId, userId, amount } = await c.req.json();
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }
        const wallet = await walletModel.updateBalance(walletId, userId, amount);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                success: true,
                msg: `Update balance of user ID ${userId}`,
                data: wallet
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

const updateTotalEarning = async (c: Context) => {
    try {
        const { walletId, userId, amount } = await c.req.json();
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }

        const wallet = await walletModel.updateTotalEarning(walletId, userId, amount);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                success: true,
                msg: `Update total earning of user ID ${userId}`,
                data: wallet
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
const updateTotalDeposit = async (c: Context) => {
    try {
        const { walletId, userId, amount } = await c.req.json();
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }

        const wallet = await walletModel.updateTotalDeposit(walletId, userId, amount);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                success: true,
                msg: `Update total deposit of user ID ${userId}`,
                data: wallet
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
const updateHighestProfit = async (c: Context) => {
    try {
        const { walletId, userId, amount } = await c.req.json();
        const user = await userModel.getUserInfoById(userId);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this user ID ${userId}`
                },
                404
            )
        }

        const wallet = await walletModel.updateHighestProfit(walletId, userId, amount);

        if (!wallet) {
            return c.json(
                {
                    success: false,
                    msg: `Not found wallet of this user ID ${userId}`
                },
                404
            )
        }

        return c.json(
            {
                success: true,
                msg: `Update the highest profit of user ID ${userId}`,
                data: wallet
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

export { createWallet, getWalletId, getUserWallet, updateBalance, updateHighestProfit, updateTotalDeposit, updateTotalEarning }