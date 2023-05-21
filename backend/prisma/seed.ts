import { PrismaClient, Member } from '@prisma/client'

const prisma = new PrismaClient()

async function createJavaScriptCourse (adminMember: Member): Promise<void> {
  const JavascriptIsland = await prisma.island.create({
    data: {
      island_name: 'JavaScript',
      island_describe:
        'JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.',
      img_source_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png',
      judge_language_id: 70,
      leader_member_id: adminMember.member_id
    }
  })

  const JavascriptChapter1 = await prisma.chapter.create({
    data: {
      chapter_name: 'JavaScript_Chapter1',
      chapter_detail: 'JavaScript_Chapter1_description',
      chapter_order: 0,
      island_id: JavascriptIsland.island_id
    }
  })

  const JavascriptLesson1 = await prisma.lesson.create({
    data: {
      lesson_name: 'JavaScript_Lesson1',
      lesson_order: 0,
      lesson_describe: 'This is the short description of lesson1',
      lesson_teach_content: '#Title\n this is the long content of lesson1',
      chapter_id: JavascriptChapter1.chapter_id
    }
  })

  const JavascriptLesson1Program = await prisma.program.create({
    data: {
      standard_answer_code: `
          function sum(a, b) {
            return a + b;
          }
          `,
      function_name: 'sum',
      exhibit_code: `
          function sum(a, b) {

          }`,
      lesson_id: JavascriptLesson1.lesson_id
    }
  })

  await prisma.testSet.create({
    data: {
      input: '0,2',
      output: '2',
      program_id: JavascriptLesson1Program.program_id
    }
  })

  await prisma.testSet.create({
    data: {
      input: '1,2',
      output: '3',
      program_id: JavascriptLesson1Program.program_id
    }
  })
}

async function createAdminMember (): Promise<Member> {
  const adminMember = await prisma.member.create({
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
  return adminMember
}

async function main (): Promise<void> {
  console.log('Start seeding ...')
  const adminMember = await createAdminMember()
  await createJavaScriptCourse(adminMember)
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
