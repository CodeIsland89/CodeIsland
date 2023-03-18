import { Ctx } from './../types/context'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail'
import getBackendBaseURL from '../utils/getBackendBaseURL'
import getErrorMessage from '../utils/getErrorMessage'
import hashString from '../utils/hashString'

export default async function sendRegisterEmailHandler (
  req: Request,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { email, password, nickname } = req.body
    const { transporter } = ctx
    const createMemberToken = jwt.sign(
      {
        createMemberJSON: {
          email,
          password: hashString(password),
          nickname
        }
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    const emailInfo = {
      to: email,
      subject: 'CodeIsland 註冊信',
      html: `
            <h1>感謝您註冊CodeIsland</h1><br>
          <a href=${getBackendBaseURL()}/api/auth/createMember?token=${createMemberToken}>請點擊這個連結來完成註冊</a>`
    }
    await sendEmail(emailInfo, transporter)

    res.status(200).json({
      message: 'Email sent',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
