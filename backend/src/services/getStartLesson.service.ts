import { PrismaClient, Lesson } from '@prisma/client'

export default async function getStartLesson (
  prisma: PrismaClient,
  chapterId: number
): Promise<Lesson> {
  const startLesson = await prisma.lesson.findFirst({
    where: {
      chapter_id: chapterId,
      lesson_order: 0
    }
  })
  if (startLesson == null) {
    throw new Error("Can't find start lesson")
  }
  return startLesson
}
