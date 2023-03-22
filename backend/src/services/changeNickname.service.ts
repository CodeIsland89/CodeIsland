import { PrismaClient, Member } from '@prisma/client'
export default async function changeNickname (
  prisma: PrismaClient,
  memberId: number,
  nickname: string
): Promise<Member> {
  const updatedMember = await prisma.member.update({
    where: {
      member_id: memberId
    },
    data: {
      Profile: {
        update: {
          nickname
        }
      }
    }
  })
  return updatedMember
}
