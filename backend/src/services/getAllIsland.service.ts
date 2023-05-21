import { PrismaClient, Island } from '@prisma/client'
export default async function getAllIsland (
  prisma: PrismaClient
): Promise<Island[]> {
  const islands = await prisma.island.findMany({
    include: {
      Chapter: {
        include: {
          Lesson: true
        }
      }
    }
  })

  if (islands === null) {
    throw new Error('Islands not found')
  }

  return islands
}
