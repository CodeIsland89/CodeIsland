import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function createJavaScriptCourse (): Promise<void> {
  const JavaScriptIslandData: Prisma.TestSetCreateInput = {
    input: '[1,2]',
    output: '6',
    testset_profile: {
      create: {
        standard_answer_code: `
        function sum(a, b) {
          return a + b;
        }
        `,
        function_name: 'sum',
        exhibit_code: `
        function sum(a, b) {
          
        }`,
        quiz: {
          create: {
            quiz_title: 'JavaScript_Quiz1',
            quiz_describe: 'JavaScript_Quiz1_description',
            quiz_teach_content: 'JavaScript_Quiz1_teach_content',
            quiz_type: 'TESTSET',
            quiz_order: 0,
            lesson: {
              create: {
                lesson_name: 'JavaScript_Lesson1',
                lesson_order: 0,
                lesson_describe: 'JavaScript_Lesson1_teach_content',
                chapter: {
                  create: {
                    chapter_name: 'JavaScript_Chapter1',
                    chapter_detail: 'JavaScript_Chapter1_description',
                    chapter_order: 0,
                    island: {
                      create: {
                        island_name: 'JavaScript',
                        island_describe:
                          'JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.',
                        img_source_url:
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png'
                      }
                    }
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
      password:
        'a32074531a1cabd1f3e6a0c42dd629edf01a6403fecbfdea2d9f5e8a23a601db', // this_is_my_password
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
