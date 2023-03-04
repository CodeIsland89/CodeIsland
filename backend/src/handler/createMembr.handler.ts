import {
  createMemberRequestBody,
  CreateMemberResponse
} from './../types/createMemberType'
import { Ctx } from '../types/context'

export default async function createMemberHandler (
  createMemberJSON: createMemberRequestBody,
  ctx: Ctx
): Promise<CreateMemberResponse> {
  const { prisma } = ctx
  const newMember = await prisma.member.create({
    data: createMemberJSON
  })
  const isLands = await prisma.island.findMany()
  await Promise.all(
    isLands.map(async (island) => {
      await prisma.memberIsland.create({
        data: {
          island_id: island.island_id,
          member_id: newMember.member_id
        }
      })
    })
  )

  return {
    message: 'Member created',
    error: ''
  }
}
