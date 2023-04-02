import type { Ctx } from './src/types/context'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'
import app from './src/init/express'
import prisma from './src/init/prisma'
import config from './src/configs'
import routes from './src/routes'
import transporter from './src/init/transporter'
import isDeveloping from './src/utils/isDeveloping'

// Context Settings
const ctx: Ctx = {
  prisma,
  config,
  transporter
}

// Register routes
const router = routes(ctx, app)
app.use('/api', router)

// Swagger Setup
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Server Run Success info
if (isDeveloping()) {
  app.listen(ctx.config.port, () => {
    console.info(
      `🚀 Prisma Server ready at: http://localhost:${ctx.config.port}`
    )
  })
}

export default app
