import { Member, PrismaClient, Prisma } from '@prisma/client'

export default async function findOneMember (
  prisma: PrismaClient,
  where: Prisma.MemberWhereUniqueInput
): Promise<Member> {
  const member = await prisma.member.findUnique({
    where
  })

  if (member === null) {
    throw new Error('Member not found')
  }

  return member
}
