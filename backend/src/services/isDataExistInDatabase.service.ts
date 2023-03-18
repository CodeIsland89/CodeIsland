import { Prisma, PrismaClient } from '@prisma/client'
import { Ctx } from '../types/context'

type PrismaClientKeys = Exclude<
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
>

export type UniqueWheres =
  | Prisma.MemberWhereUniqueInput
  | Prisma.ProfileWhereUniqueInput
  | Prisma.RoleWhereUniqueInput
  | Prisma.ActionWhereUniqueInput
  | Prisma.IslandWhereUniqueInput
  | Prisma.MemberIslandWhereUniqueInput
  | Prisma.ChapterWhereUniqueInput
  | Prisma.LessonWhereUniqueInput
  | Prisma.QuizWhereUniqueInput
  | Prisma.TestSetProfileWhereUniqueInput
  | Prisma.MemberTestProfilePerformanceWhereUniqueInput
  | Prisma.TestSetWhereUniqueInput
  | Prisma.OptionWhereUniqueInput

export default async function isDataExistInDatabase (
  ctx: Ctx,
  tableName: PrismaClientKeys,
  where: UniqueWheres
): Promise<boolean> {
  const { prisma } = ctx
  // @ts-expect-error
  const record = await prisma[tableName].findUnique({ where })
  if (record === null) return false
  return true
}
