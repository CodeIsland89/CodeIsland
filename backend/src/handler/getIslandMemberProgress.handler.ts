import { getIslandMemberProgressEndpointResponse } from './../types/endpoints/getIslandMemberProgress.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getTotalQuizOfIsland from '../services/getTotalQuizOfIsland.service'
import getMemberSolvedQuizCountOfIsland from '../services/getMemberSolvedQuizCountOfIsland.service'
import getAllIsland from '../services/getAllIsland.service'

export default async function getIslandMemberProgressHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const { member } = req.locals

    const islands = await getAllIsland(prisma)

    const data: getIslandMemberProgressEndpointResponse[] = await Promise.all(
      islands.map(async (island) => {
        const getTotalQuizOfIslandCount = await getTotalQuizOfIsland(
          prisma,
          island.island_id
        )

        const memberIslandSolvedQuizCount =
          await getMemberSolvedQuizCountOfIsland(
            prisma,
            member.member_id,
            island.island_id
          )

        return {
          island_id: island.island_id,
          island_name: island.island_name,
          island_description: island.island_describe,
          island_image_url: island.img_source_url,
          island_solved_quiz_count: memberIslandSolvedQuizCount,
          island_total_quiz_count: getTotalQuizOfIslandCount
        }
      })
    )

    res.status(200).json({
      message: "Success getIslands's data",
      data,
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
