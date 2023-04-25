import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getChaptersInfoHandler from '../handler/getChaptersInfo.handler'
import getChaptersValidation from '../validations/endpoints/getChaptersInfo.validation'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()
  router.get(
    '/getChaptersInfo/:islandId',
    getChaptersValidation(),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await getChaptersInfoHandler(req as getUserProfileRequest, res, ctx)
      /*
      #swagger.responses[200] = {
        description: '成功取得資訊',
        schema: {
          "message": "Success getChapter's data",
          "data": [
            {
              "chapter_id": 1,
              "chapter_name": "JavaScript_chapter1",
              "chapter_detail": "Declaring variables is fundamental to learning a programming language",
              "chapter_order": 0,
            }
          ],
          "error": ""
        }
      }

      #swagger.responses[400] = {
        description: '輸入的資料有誤',
        schema: {
          errors: 'islandId is not valid format'
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
