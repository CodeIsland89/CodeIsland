import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export default function valdationResultMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array()[0].msg })
  } else {
    next()
  }
}
