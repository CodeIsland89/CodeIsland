import jwt from 'jsonwebtoken'
import request from './index'
import getRandomString from '../src/utils/getRandomString'

describe('authRouter Test', () => {
  const email = `${getRandomString(15)}@gmail.com`
  const password = 'this_is_my_password'
  const nickname = 'this_is_my_nickname'

  it('should sendRegisterEmail', async () => {
    const response = await request.post('/api/auth/sendRegisterEmail').send({
      email,
      password,
      nickname
    })
    expect(response.status).toBe(200)
  })

  it('should createMember', async () => {
    const token = jwt.sign(
      { email, password, nickname },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    const response = await request.get(`/api/auth/createMember?token=${token}`)
    expect(response.status).toBe(200)
  })

  it('should Login', async () => {
    const response = await request.post('/api/auth/login').send({
      email,
      password
    })
    expect(response.status).toBe(200)
  })
})