import { checkSchema, ValidationChain } from 'express-validator'
import { Ctx } from '../../types/context'
import checkAuthorization from '../checkAuthorization.validation'

export default function sendResetPasswordEmailValidation (
  ctx: Ctx
): ValidationChain[] {
  return checkSchema({
    Authorization: checkAuthorization(ctx)
  })
}
