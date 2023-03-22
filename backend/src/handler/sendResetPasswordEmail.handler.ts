import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import sendEmail from '../utils/sendEmail'
import jwt from 'jsonwebtoken'
import getFrontendURL from './../utils/getFrontendURL'

export default async function sendResetPasswordEmailHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { member } = req.locals
    const { transporter } = ctx

    const tokenInfo = {
      email: member.email
    }

    const createMemberToken = jwt.sign(
      tokenInfo,
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    )

    const emailInfo = {
      to: member.email,
      subject: 'CodeIsland 重新設置密碼信件',
      html: `
            <h1>請點擊下方的連結來重新設置密碼</h1><br>
          <a href=${getFrontendURL()}/auth/resetPassword?token=${createMemberToken}>請點擊這個連結來完成註冊</a>`
    }
    await sendEmail(emailInfo, transporter)

    res.status(200).json({
      message: 'Success SendResetPasswordEmail',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
