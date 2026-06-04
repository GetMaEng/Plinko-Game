import { sign } from "hono/jwt";
import type { CookieOptions } from "hono/utils/cookie";

type User = {
    userId: number;
    username: string;
    email: string;
    imageProfile: string;
}

export const generateToken = async (user: User) : Promise<string> => {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        data: user,
        iat: now,
        exp: now + 24 * 60 * 60,
    };

    const token = await sign(payload, process.env.JWT_SECRET!, 'HS256');

    return token
}

export const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',  // or Strict
    path: '/',
    maxAge: 86400,  // 1 day
} as CookieOptions