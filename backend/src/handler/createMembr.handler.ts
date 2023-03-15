import { createMemberRequestWithLocals } from './../types/endpoints/createMember.type'
import { Response } from 'express'
import { Ctx } from '../types/context'
import hashString from '../utils/hashString'
import { Member, Chapter, Lesson, PrismaClient } from '@prisma/client'
import getErrorMessage from '../utils/getErrorMessage'

export default async function createMemberHandler (
  req: createMemberRequestWithLocals,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { prisma } = ctx
    const {
      createMemberData: { email, password, nickname }
    } = req.locals
    const newMember = await createMember(prisma, email, password, nickname)
    const isLands = await prisma.island.findMany()
    await Promise.all(
      isLands.map(async (island) => {
        const firstChapterByIsland = await getStartChapter(
          prisma,
          island.island_id
        )

        const firstLessonByChapter = await getStartLesson(
          prisma,
          firstChapterByIsland.chapter_id
        )

        await prisma.memberIsland.create({
          data: {
            island: {
              connect: {
                island_id: island.island_id
              }
            },
            member: {
              connect: {
                member_id: newMember.member_id
              }
            },
            chapter_status: {
              connect: {
                chapter_id: firstChapterByIsland.chapter_id
              }
            },
            lesson_status: {
              connect: {
                lesson_id: firstLessonByChapter.lesson_id
              }
            }
          }
        })
      })
    )

    res.status(200).json({
      message: 'Member created',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}

async function createMember (
  prisma: PrismaClient,
  email: string,
  password: string,
  nickname: string
): Promise<Member> {
  const newMember = await prisma.member.create({
    data: {
      email,
      password: hashString(password),
      Profile: {
        create: {
          nickname
        }
      }
    }
  })
  return newMember
}

async function getStartChapter (
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

async function getStartLesson (
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
