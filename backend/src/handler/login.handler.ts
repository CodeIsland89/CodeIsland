import {
  loginRequestWithLocals,
  UserTokenDecoded
} from './../types/endpoints/login.type'
import jwt from 'jsonwebtoken'
import { Response } from 'express'
import getErrorMessage from '../utils/getErrorMessage'
export default async function LoginHandler (
  req: loginRequestWithLocals,
  res: Response
): Promise<void> {
  try {
    const { member } = req.locals
    const info: UserTokenDecoded = {
      id: member.member_id
    }
    const token = jwt.sign(info, process.env.JWT_SECRET as string)

    res.status(200).json({
      message: 'Login success',
      error: '',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(error)
    })
  }
}
