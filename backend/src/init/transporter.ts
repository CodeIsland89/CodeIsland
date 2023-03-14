import nodemailer from 'nodemailer'
import isDeveloping from '../utils/isDeveloping'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})
if (isDeveloping()) {
  transporter.verify(function (error) {
    if (error != null) {
      console.error(error)
    } else {
      console.info('🚀 Email Server is ready to send emails')
    }
  })
}

export default transporter
export type Transporter = typeof transporter
