import { ValidationChain, checkSchema } from 'express-validator'
import hashString from '../../utils/hashString'
import { Ctx } from './../../types/context'
import findOneMember from '../../services/findOneMember.service'

export default function loginValidation (ctx: Ctx): ValidationChain[] {
  return checkSchema({
    email: {
      in: 'body',
      notEmpty: {
        errorMessage: 'Email is required'
      },
      isEmail: {
        errorMessage: 'Email is not valid format of email'
      },
      custom: {
        options: async (email: string, { req }) => {
          const { prisma } = ctx

          const member = await findOneMember(prisma, {
            email
          })

          if (member === null) {
            throw new Error('Member not found')
          }

          if (member.password !== hashString(req.body.password)) {
            throw new Error('Password is not correct')
          }
          req.locals = {
            member
          }
          return true
        }
      }
    },
    password: {
      in: 'body',
      notEmpty: {
        errorMessage: 'Password is required'
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 chars long'
      }
    }
  })
}
