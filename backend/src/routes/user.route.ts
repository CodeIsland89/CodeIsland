import { Ctx } from '../types/context'
import { Router as expressRouter, Express, Request, Response } from 'express'
import valdationResultMiddleware from '../middleware/validationResult.middleware'
import getUserProfileValidation from '../validations/endpoints/getUserProfile.validation'
import getUserProfileHandler from '../handler/getUserProfile.handler'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import getIslandMemberProgressValidation from '../validations/endpoints/getIslandMemberProgress.validation'
import getIslandMemberProgressHandler from '../handler/getIslandMemberProgress.handler'
import changeNicknameValidation from '../validations/endpoints/changeNickname.validation'
import changeNicknameHandler from '../handler/changeNickname.handler'
import sendResetPasswordEmailValidation from './../validations/endpoints/sendResetPasswordEmail.validation'
import sendResetPasswordEmailHandler from '../handler/sendResetPasswordEmail.handler'
import resetPasswordValidation from './../validations/endpoints/resetPassword.validation'
import resetPasswordHandler from '../handler/resetPassword.handler'

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
          data: {
            "member_id": 2,
            "continuous_day": 0,
            "exp": 0,
            "gem": 0,
            "nickname": "this_is_my_nickname",
            "img_source_url": null,
            "email": "yourEmail@example.com"
          },
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

  router.patch(
    '/changeNickname',
    changeNicknameValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await changeNicknameHandler(req as getUserProfileRequest, res, ctx)
      /*
        #swagger.summary = '使用token以及新暱稱來修改使用者得暱稱,暱稱記得要兩個字母長!',
        #swagger.parameters['Authorization'] = {
          in: 'header',
          description: '在Authorization欄位輸入Bearer + token',
          required: true,
          schema: {
            Authorization: 'Bearer token'
          }
        }
        #swagger.parameters['body'] = {
          in: 'body',
          description: '輸入新的暱稱',
          required: true,
          schema: {
            nickname: 'new nickname'
          }
        }
      */

      /*
      #swagger.responses[200] = {
        description: '成功修改暱稱',
        schema: {
          "message": "Success to change nickname",
          "error": ""
        }
      }

      #swagger.responses[400] = {
        description: 'Token 有誤',
        schema: {
          errors: 'JWT is not valid format'
        }
      }

      #swagger.responses[400] = {
        description: '暱稱最少要兩個字母長',
        schema: {
          errors: 'Nickname must be at least 2 characters long'
        }
      }

      #swagger.responses[500] = {
        description: '因為伺服器的問題，導致修改暱稱失敗',
        schema: {
          message: 'Internal Server Error',
          errors: 'Error message here'
        }
      }
     */
    }
  )

  router.post(
    '/sendResetPasswordEmail',
    sendResetPasswordEmailValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await sendResetPasswordEmailHandler(
        req as getUserProfileRequest,
        res,
        ctx
      )
      /*
        #swagger.summary = '使用token來發送要求重設密碼的信件',
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
        description: '成功發送重設密碼信件',
        schema: {
          "message": "Success SendResetPasswordEmail",
          "error": ""
        }
      }

      #swagger.responses[400] = {
        description: 'Token 有誤',
        schema: {
          errors: 'JWT is not valid format'
        }
      }

      #swagger.responses[500] = {
        description: '因為伺服器的問題，導致發送信件失敗',
        schema: {
          message: 'Internal Server Error',
          errors: 'Error message here'
        }
      }
     */
    }
  )

  router.patch(
    '/resetPassword',
    resetPasswordValidation(ctx),
    valdationResultMiddleware,
    async (req: Request, res: Response) => {
      await resetPasswordHandler(req as getUserProfileRequest, res, ctx)
      /*
        #swagger.summary = '使用token以及新密碼來重設密碼',
        #swagger.parameters['body'] = {
          in: 'body',
          description: '放入在endpoint sendResetPasswordEmail收到的Token以及輸入新的密碼,密碼最少要八個字母長',
          required: true,
          schema: {
            token: 'token',
            newPassword: 'new password'
          }
        }
      */

      /*
      #swagger.responses[200] = {
        description: '成功重設密碼',
        schema: {
          "message": "Success to reset password",
          "error": ""
        }
      }

      #swagger.responses[400] = {
        description: 'Token 有誤',
        schema: {
          errors: 'JWT is not valid format'
        }
      }

      #swagger.responses[400] = {
        description: '密碼格式有誤',
        schema: {
          errors: 'New Password must be at least 8 chars long'
        }
      }

      #swagger.responses[500] = {
        description: '因為伺服器的問題，導致重設密碼失敗',
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
