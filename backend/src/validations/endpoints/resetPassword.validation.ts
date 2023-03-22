import { Ctx } from './../../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import jwt from 'jsonwebtoken'
import getErrorMessage from './../../utils/getErrorMessage'
import findOneMember from '../../services/findOneMember.service'

export default function resetPasswordValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    token: {
      in: 'body',
      isJWT: {
        errorMessage: 'JWT is not valid format'
      },
      custom: {
        options: async (token, { req }) => {
          try {
            const { email } = jwt.verify(
              token as string,
              process.env.JWT_SECRET as string
            ) as { email: string }

            const member = await findOneMember(ctx.prisma, {
              email
            })

            if (member === null) {
              throw new Error('This Email is not exists, jwt is invalid')
            }

            req.locals = {
              ...req.locals,
              member
            }

            return true
          } catch (error) {
            throw new Error(getErrorMessage(error))
          }
        }
      }
    },
    newPassword: {
      in: 'body',
      notEmpty: {
        errorMessage: 'New Password is required'
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'New Password must be at least 8 chars long'
      }
    }
  })
}
