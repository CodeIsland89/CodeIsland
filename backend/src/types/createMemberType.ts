import { Request } from 'express'
export type createMemberRequestBody = {
  email: string
  password: string
  nickname: string
}

export type CreateMemberResponse = {
  message: string
  error: string
}

export interface RequestWithTokenInParams extends Request {
  token?: string
}
