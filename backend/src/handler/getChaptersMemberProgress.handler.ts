import { getChaptersMemberProgress } from './../types/endpoints/getChaptersMemberProgress.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getChapters from '../services/getChaptersByIslandId.service'

export default async function getChaptersMemberProgressHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const { member } = req.locals
    const islandId = parseInt(req.params.islandId)
    const chapters = await getChapters(prisma, islandId)
    const memberislands = req.locals.member.MemberIsland
    // islandid&memberid去跟memberiisland裡的memberid&islandid去做比對，寫出for迴圈去找出memberisland裡的quiz
    const MemberCurrentProgressMemberIsland = memberislands.find(
      (memberisland) => {
        const propIslandIdEqualMemberIslandId =
          islandId === memberisland.island_id

        const propMemberIdEqualMemberIslandMemberId =
          member.member_id === memberisland.member_id

        if (
          propIslandIdEqualMemberIslandId &&
          propMemberIdEqualMemberIslandMemberId
        ) {
          return true
        }
        return false
      }
    )
    if (MemberCurrentProgressMemberIsland === undefined) {
      throw new Error("Can't find relation with member and island")
    }
    const MemberCurrentProgressQuizId =
      MemberCurrentProgressMemberIsland.latest_solved_quiz_id

    // 取出quiz_id後,根據quiz_id找出QUIZ物件裡的lesson_id,再根據lesson_id找出LESSON物件相對應的chapter_id,再根據chapter_id找出CHAPTER物件相對應的chapter_order
    const MemberCurrentProgressQuiz = await prisma.quiz.findUniqueOrThrow({
      where: {
        quiz_id: MemberCurrentProgressQuizId
      }
    })
    const MemberCurrentProgressLesson = await prisma.lesson.findUniqueOrThrow({
      where: {
        lesson_id: MemberCurrentProgressQuiz.lesson_id
      }
    })
    const MemberCurrentProgressChapter = await prisma.chapter.findUniqueOrThrow(
      {
        where: {
          chapter_id: MemberCurrentProgressLesson.chapter_id
        }
      }
    )
    // 用for迴圈判斷是否將章節鎖起來

    const chaptersWithUnLock: getChaptersMemberProgress[] = chapters.map(
      (chapter) => {
        return {
          chapter_id: chapter.chapter_id,
          is_chapter_unlocked:
            chapter.chapter_order <= MemberCurrentProgressChapter.chapter_order
        }
      }
    )

    res.status(200).json({
      message: "Success getChapters's data",
      data: chaptersWithUnLock,
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
