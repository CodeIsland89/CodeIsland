import { createMemberRequestBody } from './../types/createMemberType'
import jwt from 'jsonwebtoken'
import { Ctx } from './../types/context'
import { Request, Response } from 'express'
import sendRegisterEmailHandler from '../handler/sendRegisterEmail.handler'
import getErrorMessage from '../utils/getErrorMessage'
import createMemberHandler from '../handler/createMembr.handler'

async function sendRegisterEmail (req: Request, res: Response): Promise<void> {
  try {
    const { email, password, nickname } = req.body
    res
      .status(200)
      .json(await sendRegisterEmailHandler({ email, password, nickname }))
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

export default {
  sendRegisterEmail,
  createMember
}
