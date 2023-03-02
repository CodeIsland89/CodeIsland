import { PrismaClient } from '@prisma/client'
import { Ctx } from '../types/context'

type Where = Record<string, any>

export default async function isDataExistInDatabase (
  ctx: Ctx,
  tableName: Exclude<
  keyof PrismaClient,
  | '$connect'
  | '$disconnect'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$on'
  | '$use'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction'
  >,
  where: Where
): Promise<boolean> {
  const { prisma } = ctx
  // @ts-expect-error
  const record = await prisma[tableName].findUnique({ where })
  if (record === null) return false
  return true
}
