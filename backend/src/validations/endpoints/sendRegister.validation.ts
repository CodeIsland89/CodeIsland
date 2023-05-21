import { checkSchema, ValidationChain } from 'express-validator'
import { Ctx } from '../../types/context'
import findOneMember from '../../services/findOneMember.service'

export default function sendRegisterValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Email is not valid format'
      },
      custom: {
        options: async (value, { req }) => {
          const isExist = await findOneMember(ctx.prisma, { email: value })
          if (isExist !== null) throw new Error('Email is already exists')
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
