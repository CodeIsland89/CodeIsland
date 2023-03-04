import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
if (process.env.NODE_ENV !== 'test') {
  void prisma.$connect().then(() => {
    console.info('🚀 Prisma connected')
  })
}

export default prisma
