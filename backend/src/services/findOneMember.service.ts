import {
  Member,
  PrismaClient,
  Prisma,
  MemberIslandProgress,
  Profile
} from '@prisma/client'

type MixedMemberType =
  | (Member & {
    MemberIslandProgress: MemberIslandProgress[]
    Profile: Profile | null
  })
  | null

export default async function findOneMember (
  prisma: PrismaClient,
  where: Prisma.MemberWhereUniqueInput,
  nullable: boolean = true
): Promise<MixedMemberType> {
  const member = await prisma.member.findUnique({
    where,
    include: {
      MemberIslandProgress: true,
      Profile: true
    }
  })

  if (member === null && !nullable) {
    throw new Error('Member not found')
  }

  return member
}
