import nodemailer from 'nodemailer'

type SendEmailProps = {
  to: string
  subject: string
  html: string
}
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

transporter.verify(function (error, success) {
  if (error != null) {
    console.error(error)
  } else {
    console.log('Email Server is ready to send emails')
  }
})

export default async function sendEmail (info: SendEmailProps): Promise<void> {
  if (!validateEmail(info.to)) throw new Error("Email isn't valid format")
  transporter
    .sendMail({
      from: process.env.EMAIL_USER,
      to: info.to,
      subject: info.subject,
      html: info.html
    })
    .then((res) => {
      const isSucess = res.accepted.length > 0
      if (!isSucess) throw new Error("Email wasn't sent")
    })
    .catch((error) => {
      throw error
    })
}

function validateEmail (email: string): boolean {
  const testRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return testRegex.test(String(email).toLowerCase())
}
