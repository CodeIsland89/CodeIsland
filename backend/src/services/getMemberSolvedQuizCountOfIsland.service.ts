import { PrismaClient } from '@prisma/client'
export default async function getMemberSolvedLessonCountOfIsland (
  prisma: PrismaClient,
  memberId: number,
  islandId: number
): Promise<number> {
  const memberProgressOfIsland = await prisma.memberIslandProgress.findUnique({
    where: {
      member_id_island_id: {
        member_id: memberId,
        island_id: islandId
      }
    }
  })

  if (memberProgressOfIsland === null) {
    throw new Error('MemberProgressOfIsland is null')
  }

  const latestSolvedLessonId = memberProgressOfIsland.latest_solved_lesson_id
  const latestSolvedLesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: latestSolvedLessonId
    }
  })

  const latestSolvedChapter = await prisma.chapter.findUnique({
    where: {
      chapter_id: latestSolvedLesson?.chapter_id
    }
  })

  const solvedLessonCountBeforeCurrentChapter = await prisma.lesson.count({
    where: {
      Chapter: {
        chapter_order: {
          lte: latestSolvedChapter?.chapter_order
        },
        Island: {
          island_id: islandId
        }
      }
    }
  })

  return solvedLessonCountBeforeCurrentChapter
}
