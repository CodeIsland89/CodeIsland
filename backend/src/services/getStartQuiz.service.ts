import { PrismaClient, Quiz } from '@prisma/client'

export default async function getStartQuiz (
  prisma: PrismaClient,
  lessonId: number
): Promise<Quiz> {
  const startQuiz = await prisma.quiz.findFirst({
    where: {
      lesson_id: lessonId
    }
  })
  if (startQuiz == null) {
    throw new Error("Can't find start quiz")
  }
  return startQuiz
}
