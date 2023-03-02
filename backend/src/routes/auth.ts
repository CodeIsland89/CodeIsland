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
      .custom(async (value) => {
        const isExist = await checkDataExistInDatabase(ctx, 'member', {
          email: value
        })
        if (isExist) throw new Error('Email is already exists')
        return true
      })
      .withMessage('Email is already exists'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('nickname')
      .isLength({ min: 2 })
      .withMessage('Nickname must be at least 2 characters'),
    async (req, res) => {
      /*
        #swagger.summary = '發送註冊信到使用者的信箱，點擊信件中的連結來完成註冊'
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Email 要是符合 Email的格式,\n Password 至少要有8個字母長,\n nickname 至少要有2個字母長',
          required: true,
          schema: {
              email: "user@gmail.com",
              password: "12342312312",
              nickname: "user"
          }
        }
      */

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // #swagger.responses[400] = { description: '輸入的資料有誤'}
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
          subject: 'CodeIsland 註冊信',
          html: `
            <h1>感謝您註冊CodeIsland</h1><br>
          <a href=${hostURL}/api/auth/createMember?token=${createMemberToken}>請點擊這個連結來完成註冊</a>`
        })

        // #swagger.responses[200] = { description: '成功發送信件'}
        return res.status(200).json({
          message: 'Email sent',
          error: ''
        })
      } catch (error) {
        // #swagger.responses[500] = { description: '發送信件失敗,因為伺服器端的不明問題導致失敗'}
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

  router.post(
    '/login',
    body('email').isEmail().withMessage('Email is not valid format'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    async (req, res) => {
      try {
        const { email, password } = req.body
        const member = await prisma.member.findUnique({
          where: {
            email: email as string
          }
        })

        if (member == null) {
          return res.status(400).json({
            message: 'Member not found',
            error: ''
          })
        }

        if (member.password !== hashString(password as string)) {
          return res.status(400).json({
            message: 'Password is incorrect',
            error: ''
          })
        }

        const token = jwt.sign(
          { id: member.member_id },
          process.env.JWT_SECRET as string
        )

        return res.status(200).json({
          message: 'Login success',
          error: '',
          token
        })
      } catch (error) {
        return res.status(500).json({
          message: 'Internal Server Error',
          error: getErrorMessage(error)
        })
      }
    }
  )

  return router
}
