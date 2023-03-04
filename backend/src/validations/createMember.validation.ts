import jwt from 'jsonwebtoken'
import { createMemberRequestBody } from './../types/createMemberType'
import { Ctx } from './../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import checkDataExistInDatabase from '../helpers/isDataExistInDatabase'

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
          const { createMemberJSON } = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string
          ) as { createMemberJSON: createMemberRequestBody }
          const isExist = await checkDataExistInDatabase(ctx, 'member', {
            email: createMemberJSON.email
          })
          if (isExist) throw new Error('Email is already exists')
          return true
        },
        errorMessage: 'Email is already exists'
      }
    }
  })
}
