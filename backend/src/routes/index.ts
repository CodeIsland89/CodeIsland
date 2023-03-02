import { Express, Router } from 'express'
import { Ctx } from './../types/context'
import authRouter from './auth'

export default (ctx: Ctx, app: Express): Router => {
  const router = Router()

  // Map Routes
  router.use(
    '/auth',
    authRouter(ctx, app)
    // #swagger.tags = ['auth']
  )

  return router
}
