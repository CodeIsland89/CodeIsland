import jwt from 'jsonwebtoken'
import { Response } from 'express'
import getErrorMessage from '../utils/getErrorMessage'

async function Login (res: Response): Promise<void> {
  try {
    const { member } = res.locals
    const token = jwt.sign(
      { id: member.member_id },
      process.env.JWT_SECRET as string
    )

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

export default {
  Login
}
