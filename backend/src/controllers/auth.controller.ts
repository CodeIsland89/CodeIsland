import { Ctx } from './../types/context'
import { createMemberRequestBody } from './../types/createMemberType'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import sendRegisterEmailHandler from '../handler/sendRegisterEmail.handler'
import getErrorMessage from '../utils/getErrorMessage'
import createMemberHandler from '../handler/createMembr.handler'

async function sendRegisterEmail (req: Request, res: Response, ctx: Ctx): Promise<void> {
  try {
    const { email, password, nickname } = req.body
    const { transporter } = ctx
    res
      .status(200)
      .json(await sendRegisterEmailHandler({ email, password, nickname, transporter }))
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}

async function createMember (
  req: Request,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { token } = req.query

    // token is validated in the middleware
    const { createMemberJSON } = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { createMemberJSON: createMemberRequestBody }

    res.status(200).json(await createMemberHandler(createMemberJSON, ctx))
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}

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
  sendRegisterEmail,
  createMember,
  Login
}
