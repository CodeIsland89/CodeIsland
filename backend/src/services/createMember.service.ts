import { PrismaClient, Member } from '@prisma/client'
export default async function createMember (
  prisma: PrismaClient,
  email: string,
  password: string,
  nickname: string
): Promise<Member> {
  const newMember = await prisma.member.create({
    data: {
      email,
      password,
      Profile: {
        create: {
          nickname
        }
      }
    }
  })
  return newMember
}
