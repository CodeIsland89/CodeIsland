import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import quickJudgeHandler from '../handler/quickJudge.handler'
import quickJudgeValidation from '../validations/endpoints/quickJudge.validation'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()
  router.post(
    '/quickJudge',
    quickJudgeValidation(),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await quickJudgeHandler(req, res)
      /*
        #swagger.summary = '快速執行程式'
        #swagger.parameters['obj'] = {
          in: 'body',
          description: '程式碼與語言編號',
          required: true,
          schema: {
            language_id: 70,
            source_code: "print(hello world)"
          }
        }
      */

      /*
      #swagger.responses[200] = {
        description: '成功取得程式執行結果',
        schema: {
          "message": "Success",
          "data": {
            "stdout": "hello world",
            "stderr": "",
            "memory": 100,
            "time": 2,
          },
          "error": ""
        }
      }

      #swagger.responses[400] = {
        description: '程式編譯失敗',
        schema: {
          "message": "Compile Error",
          "data": {
            "stdout": "",
            "stderr": "Compile Error reason",
            "memory": 100,
            "time": 2,
          },
          "error": ""
        }
      }

      #swagger.responses[404] = {
        description: '無效的Language_id',
        schema: {
          "errors": 'Not a valid language_id'
        }
      }

      #swagger.responses[500] = {
        description: '因為伺服器的問題，導致錯誤訊息發生',
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
