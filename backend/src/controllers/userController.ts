import type { Context } from "hono";
import * as userModel from "../models/userModel.js"

const createUser = async(c: Context) => {
    try {
        const body = await c.req.json();
        if (!body.username || !body.email || !body.password){
			return c.json(
				{
					success: false,
					msg: "Missing required fields.",
				},
				400
			);
		}

        if (await userModel.isDuplicate(body.username, body.email)) {
            return c.json(
                {
                    success: false,
                    msg: "Username or email is duplicated."
                },
            )
        }
        const user = await userModel.createUser(
            body.username, body.email, body.password, body.imageProfile
        );

        return c.json(
            {
                success: true,
                msg: "Create a new account.",
                data: user
            },
            201
        )
    } catch (e) {
        return c.json(
			{
				success: false,
				msg: `${e}`,
			},
			500
		);
    }
}

const getAllUserInfo = async(c: Context) => {
    try {
        const users = await userModel.getAllUserInfo();
        return c.json(
            {
                success: true,
                msg: "All users information.",
                data: users
            },
            200
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

const getUserInfoById = async(c: Context) => {
    try {
        const userId = Number(c.req.param("userId"));
        const user = await userModel.getUserInfoById(userId);
        return c.json(
            {
                success: true,
                msg: `User information of this userId ${userId}.`,
                data: user
            },
            200
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

const updateUserInfo = async(c: Context) => {
    try {
        const userId = Number(c.req.param("userId"));
        const { username, iamgeProfile } = await c.req.json();
        const user = await userModel.updateUserInfo(userId, username, iamgeProfile);
        return c.json(
            {
                success: true,
                msg: `Update user information of this userId ${userId} is successfully.`,
                data: user
            },
            200
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

const loginUser = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();
        const user = await userModel.loginUser(email);

        if (!user) {
            return c.json(
                {
                    success: false,
                    msg: `Not found this ${email} in database.`
                },
                404
            )
        }

        if (user.password !== password) {
            return c.json(
                {
                    success: false,
                    msg: `Invalid password.`
                },
                401
            )
        }

        return c.json(
            {
                success: true,
                msg: `Login successfully`,
            },
            200
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

export { createUser, getAllUserInfo, getUserInfoById, updateUserInfo, loginUser }