import { Response } from 'express'
import { Ctx } from '../types/context'
import getErrorMessage from '../utils/getErrorMessage'
import { getUserProfileRequest } from '../types/endpoints/getUserProfle.type'
import changeNickname from '../services/changeNickname.service'

export default async function changeNicknameHandler (
  req: getUserProfileRequest,
  res: Response,
  ctx: Ctx
): Promise<void> {
  try {
    const { member } = req.locals
    const { nickname } = req.body

    await changeNickname(ctx.prisma, member.member_id, nickname)

    res.status(200).json({
      message: 'Success to change nickname',
      error: ''
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
