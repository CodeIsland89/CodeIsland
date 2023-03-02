import { Ctx } from '../types/context'
import { Router as expressRouter, Express } from 'express'
import getErrorMessage from '../utils/getErrorMessage'
import sendEmail from '../utils/sendEmail'
import { body, validationResult } from 'express-validator'
import checkDataExistInDatabase from '../middleware/isDataExistInDatabase'
import hashString from '../utils/hashString'
import jwt from 'jsonwebtoken'

type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()
  const { prisma } = ctx

  router.post(
    '/sendRegisterEmail',
    body('email')
      .isEmail()
      .withMessage('Email is not valid format')
      .custom(async ({ req }) => {
        const isExist = await checkDataExistInDatabase(ctx, 'member', {
          email: req.body.email
        })
        return isExist
      })
      .withMessage('Email is already exists'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('nickname')
      .isLength({ min: 2 })
      .withMessage('Nickname must be at least 2 characters'),
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg })
      }

      try {
        const { email, password, nickname } = req.body
        const hostURL = process.env.HOST_URL as string

        const createMemberJSON: createMemberRequestBody = {
          email,
          password: hashString(password),
          nickname
        }
        const createMemberToken = jwt.sign(
          { createMemberJSON },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        )
        await sendEmail({
          to: email,
          subject: 'Test Email',
          html: `
            <h1>感謝您註冊CodeIsland</h1><br>
          <a href=${hostURL}/api/auth/createMember?token=${createMemberToken}>請點擊這個連結來完成註冊</a>`
        })

        return res.status(200).json({
          message: 'Email sent',
          error: ''
        })
      } catch (error) {
        return res.status(500).json({
          message: 'Internal Server Error',
          error: getErrorMessage(error)
        })
      }
    }
  )

  router.get('/createMember', async (req, res) => {
    try {
      const { token } = req.query
      const { createMemberJSON } = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as { createMemberJSON: createMemberRequestBody }

      await prisma.member.create({
        data: createMemberJSON
      })

      return res.status(200).json({
        message: 'Member created',
        error: ''
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: getErrorMessage(error)
      })
    }
  })

  return router
}
