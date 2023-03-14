import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function createJavaScriptCourse (): Promise<void> {
  const JavaScriptIslandData: Prisma.TestSetCreateInput = {
    input: '[1,2,3]',
    output: '6',
    quiz: {
      create: {
        quiz_describe: 'JavaScript_Quiz1_description',
        quiz_type: 'TESTSET',
        lesson: {
          create: {
            lesson_name: 'JavaScript_Lesson1',
            lesson_order: 0,
            chapter: {
              create: {
                chapter_name: 'JavaScript_Chapter1',
                chapter_detail: 'JavaScript_Chapter1_description',
                chapter_order: 0,
                island: {
                  create: {
                    island_name: 'JavaScript'
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  await prisma.testSet.create({
    data: JavaScriptIslandData
  })
}

async function createAdminMember (): Promise<void> {
  await prisma.member.create({
    data: {
      email: 'admin@gmail.com',
      password: 'admin',
      is_enabled: true,
      Profile: {
        create: {
          nickname: 'admin'
        }
      }
    }
  })
}

async function main (): Promise<void> {
  console.log('Start seeding ...')
  await createJavaScriptCourse()
  await createAdminMember()
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
