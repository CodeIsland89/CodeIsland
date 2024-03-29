import { Ctx } from '../../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import checkAuthorization from '../checkAuthorization.validation'

export default function getIslandMemberProgressValidation (
  ctx: Ctx
): ValidationChain[] {
  return checkSchema({
    Authorization: checkAuthorization(ctx)
  })
}
