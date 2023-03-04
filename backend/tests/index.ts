import server from '../app'
import supertest from 'supertest'

const request = supertest(server)

export default request
