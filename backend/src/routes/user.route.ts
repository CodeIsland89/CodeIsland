import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import getUserProfileValidation from '../validations/endpoints/getUserProfile.validation'
import getUserProfileHandler from '../handler/getUserProfile.handler'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getIslandMemberProgressValidation from '../validations/endpoints/getIslandMemberProgress.validation'
import getIslandMemberProgressHandler from '../handler/getIslandMemberProgress.handler'

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

  router.post(
    '/getIslandMemberProgress',
    getIslandMemberProgressValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await getIslandMemberProgressHandler(
        req as getUserProfileRequest,
        res,
        ctx
      )
      /*
        #swagger.summary = '使用token取得使用者與每個島嶼的資訊',
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
          "message": "Success getIslands's data",
          "data": [
            {
              "island_id": 1,
              "island_name": "JavaScript",
              "island_description": "JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
              "island_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
              "island_solved_quiz_count": 1,
              "island_total_quiz_count": 1
            }
          ],
          "error": ""
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
