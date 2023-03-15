import { PrismaClient } from '@prisma/client'
import isDeveloping from '../utils/isDeveloping'

const prisma = new PrismaClient()
if (isDeveloping()) {
  void prisma.$connect().then(() => {
    console.info('🚀 Prisma connected')
  })
}

export default prisma
