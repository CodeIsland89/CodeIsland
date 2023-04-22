import { PrismaClient, Chapter } from '@prisma/client'
export default async function getAllChapter (
  prisma: PrismaClient,
  islandId: number
): Promise<Chapter[]> {
  const chapters = await prisma.chapter.findMany({
    include: {
      Lesson: true
    }
  })
  const island = await prisma.island.findUnique({
    where: {
      island_id: islandId
    }
  })

  if (chapters === null) {
    throw new Error('Chapters not found')
  }

  return chapters
}
