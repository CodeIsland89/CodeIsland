import { PrismaClient } from '@prisma/client'
export default async function getMemberSolvedQuizCountOfIsland (
  prisma: PrismaClient,
  memberId: number,
  islandId: number
): Promise<number> {
  const memberProgressOfIsland = await prisma.memberIsland.findUnique({
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

  const latestSolvedQuizId = memberProgressOfIsland.latest_solved_quiz_id
  const latestSolvedQuiz = await prisma.quiz.findUnique({
    where: {
      quiz_id: latestSolvedQuizId
    }
  })

  const latestSolvedLesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: latestSolvedQuizId
    }
  })

  const latestSolvedChapter = await prisma.chapter.findUnique({
    where: {
      chapter_id: latestSolvedLesson?.chapter_id
    }
  })

  const solvedQuizCountBeforeCurrentChapter = await prisma.quiz.count({
    where: {
      lesson: {
        chapter: {
          chapter_order: {
            lt: latestSolvedChapter?.chapter_order
          },
          island: {
            island_id: islandId
          }
        }
      }
    }
  })

  if (latestSolvedQuiz === null) throw new Error('latestSolvedQuiz is null')

  return solvedQuizCountBeforeCurrentChapter
}
