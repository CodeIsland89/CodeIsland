import { Transporter } from './../init/transporter'
import jwt from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail'
import hashString from '../utils/hashString'
import getBackendBaseURL from '../utils/getBackendBaseURL'

type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

type sendRegisterEmailProps = {
  email: string
  password: string
  nickname: string
  transporter: Transporter
}

type sendRegisterEmailResponse = {
  message: string
  error: string
}

export default async function sendRegisterEmailHandler ({
  email,
  password,
  nickname,
  transporter
}: sendRegisterEmailProps): Promise<sendRegisterEmailResponse> {
  const createMemberJSON: createMemberRequestBody = {
    email,
    password: hashString(password),
    nickname
  }
  const createMemberToken = jwt.sign(
    { createMemberJSON },
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

  return {
    message: 'Email sent',
    error: ''
  }
}
