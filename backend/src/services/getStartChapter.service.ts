import { Chapter, PrismaClient } from '@prisma/client'
export default async function getStartChapter (
  prisma: PrismaClient,
  islandId: number
): Promise<Chapter> {
  const startChapter = await prisma.chapter.findFirst({
    where: {
      island_id: islandId,
      chapter_order: 0
    }
  })
  if (startChapter == null) {
    throw new Error("Can't find start chapter")
  }
  return startChapter
}
