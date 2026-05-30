import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: String(process.env.DATABASE_URL) });

const prisma = new PrismaClient({ adapter })

export default prisma