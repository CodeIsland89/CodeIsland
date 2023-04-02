import { createMemberRequestWithLocals } from './../types/endpoints/createMember.type'
import { loginRequestWithLocals } from './../types/endpoints/login.type'
import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import sendRegisterValidation from '../validations/endpoints/sendRegister.validation'
import createMemberValidation from '../validations/endpoints/createMember.validation'
import loginValidation from '../validations/endpoints/login.validation'
import sendRegisterEmailHandler from '../handler/sendRegisterEmail.handler'
import createMemberHandler from '../handler/createMembr.handler'
import LoginHandler from '../handler/login.handler'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()

  router.post(
    '/sendRegisterEmail',
    sendRegisterValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await sendRegisterEmailHandler(req, res, ctx)
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

      /*
      #swagger.responses[200] = {
        description: '成功發送信件',
        schema: {
          message: 'Email sent',
          error: ''
        }
      }

      #swagger.responses[400] = {
        description: '輸入的資料有誤',
        schema: {
           errors: 'Email is not valid format'
        }
      }

      #swagger.responses[500] = {
        description: '因為伺服器的問題，無法發送信件',
        schema: {
          message: 'Internal Server Error',
           errors: 'Error message here'
        }
      }
     */
    }
  )

  router.get(
    '/createMember',
    createMemberValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await createMemberHandler(req as createMemberRequestWithLocals, res, ctx)
      /*
        #swagger.summary = '會員點擊信件中的連結後會觸發這個API來完成註冊'
        #swagger.parameters['token'] = {
          in: 'query',
          description: '這個token是在發送註冊信的時候產生的',
          required: true,
          schema: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVNZW1iZXJKU09OIjp7ImVtYWlsIjoicmdvazMwNzA4NTY2NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAzNjI3OTViMmVlNzIzNWIzYjRkMjhmMDY5OGE4NTM2NjcwM2VhY2YwYmE0MDg1Nzk2ZmZkOTgwZDc2NTMzMzciLCJuaWNrbmFtZSI6InN0cmluZyJ9LCJpYXQiOjE2Nzc5MDc2NTEsImV4cCI6MTY3NzkxMTI1MX0.ebvQ-0j4_VCMQI3biQrElGDvevYef3mkg4lxpeMPmFM',
          }
        }
      */
      /*
        #swagger.responses[400] = {
          description: '輸入的資料有誤',
          schema: {
            errors: 'Email is not valid format'
          }
        }

        #swagger.responses[200] = {
          description: '創建會員資訊成功!',
          schema: {
            message: 'Member created',
            error: ''
          }
        }

        #swagger.responses[500] = {
          description: '創建會員失敗,因為伺服器端的不明問題導致失敗',
          schema: {
            message: 'Internal Server Error',
            error: 'Error Reason Here'
          }
        }
      */
    }
  )

  router.post(
    '/login',
    loginValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await LoginHandler(req as loginRequestWithLocals, res)
      /*
        #swagger.summary = '會員登入,成功登入後會回傳一個token'
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Email 要是符合 Email的格式,\n Password 至少要有8個字母長,\n nickname 至少要有2個字母長',
          required: true,
          schema: {
            email: 'YourEmail@gmail.com',
            password: 'YourPassword'
          }
        }
      */
      /*

        #swagger.responses[200] = {
          description: '登入成功',
          schema: {
              message: 'Login success',
              error: '',
              token: 'JWT token here'
          }
        }

        #swagger.responses[400] = {
          description: '會員不存在',
          schema: {
            message: 'Member not found',
            error: ''
          }
        }

        #swagger.responses[400] = {
          description: '密碼錯誤',
          schema: {
              message: '',
              error: 'Password is incorrect'
          }
        }

        #swagger.responses[500] = {
          description: '登入失敗,因為伺服器端的不明問題導致失敗',
          schema: {
              message: 'Internal Server Error',
              error: 'Error Reason here'
          }
        }
      */
    }
  )

  return router
}
