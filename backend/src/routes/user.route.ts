import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import getUserProfileValidation from '../validations/getUserProfile.validation'
import getUserProfileHandler from '../handler/getuserProfile.handler'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()

  router.post(
    '/getUserProfile',
    getUserProfileValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await getUserProfileHandler(req as getUserProfileRequest, res, ctx)
      /*
        #swagger.summary = '使用token取得使用者資料',
        #swagger.parameters['Authorization'] = {
          in: 'header',
          description: '在Authorization欄位輸入Bearer + token',
          required: true,
          schema: {
            Authorization: 'Bearer token'
          }
        }
      */

      /*
      #swagger.responses[200] = {
        description: '成功取得資訊',
        schema: {
          message: 'Success GetUserProfile',
          data: 'memberInfo',
          error: ''
        }
      }

      #swagger.responses[400] = {
        description: '輸入的資料有誤',
        schema: {
          errors: 'JWT is not valid format'
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

  return router
}
