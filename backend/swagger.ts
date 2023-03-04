import swaggerAutogenClient from 'swagger-autogen'
import dotenv from 'dotenv'
dotenv.config()

const swaggerAutogen = swaggerAutogenClient()

const outputFile = './swagger_output.json' // output json name

// routes
const endpointsFiles = ['./src/routes/index.ts']

const doc = {
  host: process.env.HOST_URL ?? process.env.RENDER_EXTERNAL_URL,
  basePath: '/api',
  tags: [
    {
      name: 'auth',
      description: 'auth router'
    }
  ]
}

void swaggerAutogen(outputFile, endpointsFiles, doc)
