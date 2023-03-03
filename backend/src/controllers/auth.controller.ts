import { Request, Response } from 'express'
import sendRegisterEmailHandler from '../handler/sendRegisterEmail.handler'
import getErrorMessage from '../utils/getErrorMessage'

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

export default {
  sendRegisterEmail
}
