import { checkSchema, ValidationChain } from 'express-validator'
import checkDataExistInDatabase from '../helpers/isDataExistInDatabase'
import { Ctx } from '../types/context'

export default function sendRegisterValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Email is not valid format'
      },
      custom: {
        options: async (value, { req }) => {
          const isExist = await checkDataExistInDatabase(ctx, 'member', {
            email: value
          })
          if (isExist) throw new Error('Email is already exists')
          return true
        },
        errorMessage: 'Email is already exists'
      }
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 characters'
      }
    },
    nickname: {
      isLength: {
        options: { min: 2 },
        errorMessage: 'Nickname must be at least 2 characters'
      }
    }
  })
}
