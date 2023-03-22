import { Ctx } from './../types/context'
import { Request } from 'express'
import findOneMember from '../services/findOneMember.service'
import getDecodedToken from '../utils/getDecodedToken'
import getErrorMessage from '../utils/getErrorMessage'
import { Meta, Location } from 'express-validator'

export default function checkAuthorization (ctx: Ctx): {
  in: Location
  notEmpty: {
    errorMessage: string
  }
  custom: {
    options: (_: any, { req }: Meta) => Promise<boolean>
  }
} {
  return {
    in: 'headers',
    notEmpty: {
      errorMessage: 'Token is required'
    },
    custom: {
      options: async (_: any, { req }: Meta) => {
        try {
          const { prisma } = ctx
          const { id: memberID } = getDecodedToken(req as Request)
          const member = await findOneMember(prisma, {
            member_id: memberID
          })

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
  }
}
