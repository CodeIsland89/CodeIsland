import { Request } from 'express'

export type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

export interface createMemberRequestWithLocals extends Request {
  locals: {
    createMemberData: createMemberRequestBody
  }
}
