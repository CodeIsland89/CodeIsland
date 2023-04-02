import { Member } from '@prisma/client'
import { Request } from 'express'
export interface loginRequestWithLocals extends Request {
  locals: {
    member: Member
  }
}

export type UserTokenDecoded = {
  id: number
}
