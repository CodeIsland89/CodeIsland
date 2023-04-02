import { PrismaClient, Island } from '@prisma/client'
export default async function getAllIsland (
  prisma: PrismaClient
): Promise<Island[]> {
  const islands = await prisma.island.findMany({
    include: {
      Chapter: {
        include: {
          Lesson: {
            include: {
              Quiz: true
            }
          }
        }
      }
    }
  })

  if (islands === null) {
    throw new Error('Islands not found')
  }

  return islands
}
