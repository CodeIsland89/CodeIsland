import { Ctx } from './../../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import checkAuthorization from '../checkAuthorization.validation'

export default function changeNicknameValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    Authorization: checkAuthorization(ctx),
    nickname: {
      in: 'body',
      isString: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: 'Nickname must be at least 2 characters long'
    }
  })
}
