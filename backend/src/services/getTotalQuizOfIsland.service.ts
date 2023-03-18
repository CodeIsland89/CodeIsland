import { PrismaClient } from '@prisma/client'
export default async function getTotalQuizOfIsland (
  prisma: PrismaClient,
  islandId: number
): Promise<number> {
  const totalQuiz = await prisma.quiz.count({
    where: {
      lesson: {
        chapter: {
          island: {
            island_id: islandId
          }
        }
      }
    }
  })
  return totalQuiz
}
