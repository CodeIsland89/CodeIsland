import server from '../app'
import supertest from 'supertest'

const request = supertest(server)

export { request, server }
