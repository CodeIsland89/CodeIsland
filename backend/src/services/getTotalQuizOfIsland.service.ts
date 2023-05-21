import { PrismaClient } from '@prisma/client'
export default async function getTotalLessonOfIsland (
  prisma: PrismaClient,
  islandId: number
): Promise<number> {
  const totalLesson = await prisma.lesson.count({
    where: {
      Chapter: {
        Island: {
          island_id: islandId
        }
      }
    }
  })
  return totalLesson
}
