import { Express, Router } from 'express'
import { Ctx } from './../types/context'
import authRouter from './auth.route'
import userRouter from './user.route'
import islandRouter from './island.route'
import judgeRouter from './judge.route'

export default (ctx: Ctx, app: Express): Router => {
  const router = Router()

  // Map Routes
  router.use(
    '/auth',
    authRouter(ctx, app)
    // #swagger.tags = ['auth']
  )

  router.use(
    '/user',
    userRouter(ctx, app)
    // #swagger.tags = ['user']
  )

  router.use(
    '/island',
    islandRouter(ctx, app)
    // #swagger.tags = ['island']
  )

  router.use(
    '/judge',
    judgeRouter(ctx, app)
    // #swagger.tags = ['judge']
  )

  return router
}
