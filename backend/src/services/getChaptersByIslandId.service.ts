import { PrismaClient, Chapter } from '@prisma/client'
export default async function getAllChapter (
  prisma: PrismaClient,
  islandId: number
): Promise<Chapter[]> {
  const chapters = await prisma.chapter.findMany({
    where: {
      island_id: islandId
    }
  })

  if (chapters === null) {
    throw new Error('Chapters not found')
  }

  return chapters
}
