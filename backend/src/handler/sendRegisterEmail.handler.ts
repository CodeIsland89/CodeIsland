import jwt from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail'
import hashString from '../utils/hashString'

type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

type sendRegisterEmailProps = {
  email: string
  password: string
  nickname: string
}

type sendRegisterEmailResponse = {
  message: string
  error: string
}

export default async function sendRegisterEmailHandler ({
  email,
  password,
  nickname
}: sendRegisterEmailProps): Promise<sendRegisterEmailResponse> {
  const hostURL = process.env.HOST_URL as string

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

  await sendEmail({
    to: email,
    subject: 'CodeIsland 註冊信',
    html: `
            <h1>感謝您註冊CodeIsland</h1><br>
          <a href=${hostURL}/api/auth/createMember?token=${createMemberToken}>請點擊這個連結來完成註冊</a>`
  })

  return {
    message: 'Email sent',
    error: ''
  }
}
