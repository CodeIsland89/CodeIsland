import { MemberIsland, Profile, Role } from '@prisma/client'
import { Request } from 'express'
export interface getUserProfileRequest extends Request {
  locals: {
    member: {
      member_id: number
      email: string
      password: string
      is_enabled: boolean
      MemberIsland: MemberIsland[]
      Profile: Profile
      Role: Role[]
    }
  }
}
