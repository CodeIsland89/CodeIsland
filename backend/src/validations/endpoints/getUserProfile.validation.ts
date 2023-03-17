import { Ctx } from './../../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import getErrorMessage from '../../utils/getErrorMessage'
import getDecodedToken from '../../utils/getDecodedToken'
import findOneMember from '../../services/findOneMember.service'
import { Request } from 'express'

export default function getUserProfileValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    Authorization: {
      in: 'headers',
      notEmpty: {
        errorMessage: 'Token is required'
      },
      custom: {
        options: async (token, { req }) => {
          try {
            const { prisma } = ctx
            const { id: memberID } = getDecodedToken(req as Request)
            const member = await findOneMember(prisma, {
              member_id: memberID
            })

            req.locals = {
              member
            }

            return true
          } catch (error) {
            throw new Error(getErrorMessage(error))
          }
        }
      }
    }
  })
}
