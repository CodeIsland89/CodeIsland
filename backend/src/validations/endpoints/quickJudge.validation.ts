import { ValidationChain, checkSchema } from 'express-validator'
import checkLanguageIdExist from '../../services/checkLanguageIdExist.service'

export default function quickJudgeValidation (): ValidationChain[] {
  return checkSchema({
    language_id: {
      in: 'body',
      notEmpty: {
        errorMessage: 'language_id is required'
      },
      isInt: {
        errorMessage: 'language_id must be integer'
      },
      custom: {
        options: async (languageId: number, { req }) => {
          const isExist = await checkLanguageIdExist(languageId)
          if (!isExist) {
            req.locals = {
              customErrorStatus: 404
            }
            throw new Error('Not a valid language_id')
          }
          return isExist
        }
      }
    },
    source_code: {
      in: 'body',
      notEmpty: {
        errorMessage: 'source_code is required'
      },
      isString: {
        errorMessage: 'source_code must be string'
      }
    }
  })
}
