import jwt from 'jsonwebtoken'
import { createMemberRequestBody } from '../types/endpoints/createMember.type'
import { Ctx } from './../types/context'
import { checkSchema, ValidationChain } from 'express-validator'
import checkDataExistInDatabase from '../helpers/isDataExistInDatabase'
import getErrorMessage from '../utils/getErrorMessage'

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
            const createMemberData = jwt.verify(
              token as string,
              process.env.JWT_SECRET as string
            ) as createMemberRequestBody

            const isExist = await checkDataExistInDatabase(ctx, 'member', {
              email: createMemberData.email
            })
            if (isExist) throw new Error('Email is already exists')
            req.locals = {
              createMemberData: {
                email: createMemberData.email,
                password: createMemberData.password,
                nickname: createMemberData.nickname
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
