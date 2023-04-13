import { getAllIslandInfoEndpointResponse } from '../types/endpoints/getAllIslandInfo.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getTotalQuizOfIsland from '../services/getTotalQuizOfIsland.service'
import getAllIsland from '../services/getAllIsland.service'

export default async function getIslandMemberProgressHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const islands = await getAllIsland(prisma)

    const data: getAllIslandInfoEndpointResponse[] = await Promise.all(
      islands.map(async (island) => {
        const getTotalQuizOfIslandCount = await getTotalQuizOfIsland(
          prisma,
          island.island_id
        )

        return {
          island_id: island.island_id,
          island_name: island.island_name,
          island_description: island.island_describe,
          island_image_url: island.img_source_url,
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
