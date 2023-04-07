import { PrismaClient, Member } from '@prisma/client'
import hashString from '../utils/hashString'
export default async function changePassword (
  prisma: PrismaClient,
  memberId: number,
  newPassword: string
): Promise<Member> {
  const updatedMember = await prisma.member.update({
    where: {
      member_id: memberId
    },
    data: {
      password: hashString(newPassword)
    }
  })
  return updatedMember
}
