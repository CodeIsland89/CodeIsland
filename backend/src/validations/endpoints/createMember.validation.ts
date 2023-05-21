import jwt from 'jsonwebtoken'
import { createMemberRequestBody } from '../../types/endpoints/createMember.type'
import { Ctx } from '../../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import getErrorMessage from '../../utils/getErrorMessage'
import findOneMember from '../../services/findOneMember.service'

export default function createMemberValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    token: {
      in: 'query',
      notEmpty: {
        errorMessage: 'Token is required'
      },
      isJWT: {
        errorMessage: 'Token is not valid format of JWT'
      },
      custom: {
        options: async (token, { req }) => {
          try {
            const { createMemberJSON } = jwt.verify(
              token as string,
              process.env.JWT_SECRET as string
            ) as { createMemberJSON: createMemberRequestBody }

            const isExist = await findOneMember(ctx.prisma, {
              email: createMemberJSON.email
            })

            if (isExist !== null) throw new Error('Email is already exists')
            req.locals = {
              createMemberData: {
                email: createMemberJSON.email,
                password: createMemberJSON.password,
                nickname: createMemberJSON.nickname
              }
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
