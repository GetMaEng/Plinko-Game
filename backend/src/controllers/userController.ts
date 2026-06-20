import type { Context } from "hono";
import * as userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { cookieOpts, generateToken } from "../lib/token.js";
import { setCookie, deleteCookie } from "hono/cookie";

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

        const payload = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            imageProfile: user.imageProfile
        };

        // Generate a JWT token
        const token = await generateToken(payload);

        // Put that JWT into a cookie
        setCookie(c, "authToken", token, cookieOpts)

        //

        return c.json(
            {
                success: true,
                msg: "Create a new account.",
                data: user,
                token: token
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

        if (!user) {
            return c.json(
                { 
                    success: false,
                    msg: 'User not found' 
                }, 
                404
            )
        }

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
        const { username, imageProfile } = await c.req.json();
        const user = await userModel.updateUserInfo(userId, username, imageProfile);
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
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return c.json(
                {
                    success: false,
                    msg: `Invalid password.`
                },
                401
            )
        }

        // If password is matching in database, then generate JWT
        const token = await generateToken(user);

        // Put JWT into a cookie
        setCookie(c, "authToken", token, cookieOpts)

        return c.json(
            {
                success: true,
                msg: `Login successfully`,
                token: token
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

const logoutUser = async (c: Context) => {
    try {
        deleteCookie(c, "authToken", {
            path: '/',
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Lax',
            httpOnly: true,
        });

        return c.json(
            {
                success: true,
                msg: "Logout successfully"
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

const getMe = async (c: Context) => {
    try {
        // jwtPayload is set by middleware before this runs
        const payload = c.get('jwtPayload')

        return c.json(
            { 
                success: true,
                msg: "This is your data.",
                data: payload
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

export { createUser, getAllUserInfo, getUserInfoById, updateUserInfo, loginUser, logoutUser, getMe }