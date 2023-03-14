import swaggerAutogenClient from 'swagger-autogen'
import dotenv from 'dotenv'
import isDeveloping from './src/utils/isDeveloping'
dotenv.config()

const options = {
  disableLogs: !isDeveloping()
}

const swaggerAutogen = swaggerAutogenClient(options)

const outputFile = './swagger_output.json' // output json name

// routes
const endpointsFiles = ['./src/routes/index.ts']

const protocol =
  process.env.RENDER_EXTERNAL_HOSTNAME !== undefined ? 'https' : 'http'

const doc = {
  host: process.env.RENDER_EXTERNAL_HOSTNAME ?? 'localhost:3001',
  schemes: [protocol],
  basePath: '/api',
  tags: [
    {
      name: 'auth',
      description: 'auth router'
    }
  ]
}

void swaggerAutogen(outputFile, endpointsFiles, doc)
