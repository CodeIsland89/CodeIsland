import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import changePassword from '../services/changePassword.service'

export default async function resetPasswordHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { member } = req.locals
    const { newPassword } = req.body

    await changePassword(ctx.prisma, member.member_id, newPassword)

    res.status(200).json({
      message: 'Success to reset password',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
