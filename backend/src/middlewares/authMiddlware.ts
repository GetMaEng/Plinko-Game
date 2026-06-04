import type { Context, Next } from 'hono'
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const authMiddleware = async (c: Context, next: Next) => {
  // const authHeader = c.req.header('Authorization')

  // if (!authHeader?.startsWith('Bearer ')) {
  //   return c.json({ error: 'Missing token' }, 401)
  // }

  // const token = authHeader.slice(7) // strip "Bearer "
  const token = getCookie(c,'authToken');
  
  try {
    const payload = await verify(token!, process.env.JWT_SECRET!, 'HS256')
    
    c.set('jwtPayload', payload) // available in controller via c.get()
    await next() // hand off to the actual handler
  } catch (e) {
    console.log(e);
    
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
}