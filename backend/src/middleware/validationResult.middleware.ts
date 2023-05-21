import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export default function valdationResultMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)

  const customErrorStatus: number | undefined = req.locals?.customErrorStatus

  if (!errors.isEmpty()) {
    res
      .status(customErrorStatus !== undefined ? customErrorStatus : 400)
      .json({ errors: errors.array()[0].msg })
  } else {
    next()
  }
}
