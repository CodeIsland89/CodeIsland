import { getAllChapterInfoEndpointResponse } from '../types/endpoints/getAllChapterInfo.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getChapters from '../services/getChaptersByIslandId.service'

export default async function getIslandMemberProgressHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const islandId = parseInt(req.params.islandId)
    const chapter = await getChapters(prisma, islandId)

    const data: getAllChapterInfoEndpointResponse[] = await Promise.all(
      chapter.map(async (chapter) => {
        return {
          chapter_id: chapter.chapter_id,
          chapter_name: chapter.chapter_name,
          chapter_detail: chapter.chapter_detail,
          chapter_order: chapter.chapter_order
        }
      })
    )

    res.status(200).json({
      message: "Success getChapters's data",
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
