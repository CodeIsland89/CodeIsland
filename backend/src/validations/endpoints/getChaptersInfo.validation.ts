import { checkSchema, ValidationChain } from 'express-validator'

export default function getIslandMemberProgressValidation (): ValidationChain[] {
  return checkSchema({
    islandId: {
      in: ['params'],
      isInt: {
        errorMessage: 'islandId is not valid format, it is Int required.'
      }
    }
  })
}
