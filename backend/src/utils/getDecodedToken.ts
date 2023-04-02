import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { UserTokenDecoded } from '../types/endpoints/login.type'
export default function getDecodedToken (req: Request): UserTokenDecoded {
  const token = req.headers.authorization?.split(' ')[1] as string
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as UserTokenDecoded
}
