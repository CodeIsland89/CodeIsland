import {
  Member,
  PrismaClient,
  Prisma,
  MemberIsland,
  Profile,
  Role
} from '@prisma/client'

type MixedMemberType =
  | (Member & {
    MemberIsland: MemberIsland[]
    Profile: Profile | null
    Role: Role[]
  })
  | null

export default async function findOneMember (
  prisma: PrismaClient,
  where: Prisma.MemberWhereUniqueInput
): Promise<MixedMemberType> {
  const member = await prisma.member.findUnique({
    where,
    include: {
      MemberIsland: true,
      Profile: true,
      Role: true
    }
  })

  if (member === null) {
    throw new Error('Member not found')
  }

  return member
}
