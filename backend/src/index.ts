import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { mainRouter } from './routes/indexRoute.js'
import prisma from './lib/prisma.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
	cors({
		origin: ['http://localhost:5173'], // Your frontend application
    credentials: true
	}),
);

app.route("", mainRouter);

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

testConnection();

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
