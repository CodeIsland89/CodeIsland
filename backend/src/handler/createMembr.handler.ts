import { createMemberRequestWithLocals } from './../types/endpoints/createMember.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import createMember from '../services/createMember.service'
import getStartChapter from '../services/getStartChapter.service'
import getStartLesson from '../services/getStartLesson.service'

export default async function createMemberHandler (
  req: createMemberRequestWithLocals,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const {
      createMemberData: { email, password, nickname }
    } = req.locals
    const newMember = await createMember(prisma, email, password, nickname)
    const isLands = await prisma.island.findMany()
    await Promise.all(
      isLands.map(async (island) => {
        const firstChapterByIsland = await getStartChapter(
          prisma,
          island.island_id
        )

        const firstLessonByChapter = await getStartLesson(
          prisma,
          firstChapterByIsland.chapter_id
        )

        await prisma.memberIslandProgress.create({
          data: {
            Island: {
              connect: {
                island_id: island.island_id
              }
            },
            Member: {
              connect: {
                member_id: newMember.member_id
              }
            },
            Lesson: {
              connect: {
                lesson_id: firstLessonByChapter.lesson_id
              }
            }
          }
        })
      })
    )

    res.status(200).json({
      message: 'Member created',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
