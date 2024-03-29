import jwt from 'jsonwebtoken'
import { request, server } from './index'
import getRandomString from '../src/utils/getRandomString'
import hashString from '../src/utils/hashString'

afterAll(() => {
  server.close()
})

describe('userRelated Test', () => {
  const email = `${getRandomString(15)}@gmail.com`
  const password = 'this_is_my_password'
  const nickname = 'this_is_my_nickname'
  const newPassword = 'this_is_my_new_password'

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
      {
        createMemberJSON: {
          email,
          password: hashString(password),
          nickname
        }
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    const response = await request.get(`/api/auth/createMember?token=${token}`)

    expect(response.status).toBe(200)
  })

  let userToken = ''
  it('should Login', async () => {
    const response = await request.post('/api/auth/login').send({
      email,
      password
    })
    userToken = response.body.token
    expect(response.status).toBe(200)
  })

  it('should getUserProfile', async () => {
    const response = await request
      .post('/api/user/getUserProfile')
      .set('Authorization', `Bearer ${userToken}`)
    expect(response.status).toBe(200)
  })

  it('should getIslandMemberProgress', async () => {
    const response = await request
      .post('/api/user/getIslandMemberProgress')
      .set('Authorization', `Bearer ${userToken}`)
    expect(response.status).toBe(200)
  })

  it('should getAllIslandInfo', async () => {
    const response = await request.get('/api/island/getAllIslandInfo')
    expect(response.status).toBe(200)
  })

  it('should changeNickname', async () => {
    const response = await request
      .patch('/api/user/changeNickname')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        nickname: 'this_is_new_nickname'
      })
    expect(response.status).toBe(200)
  })

  it('should sendResetPasswordEmail', async () => {
    const response = await request
      .post('/api/user/sendResetPasswordEmail')
      .set('Authorization', `Bearer ${userToken}`)
    expect(response.status).toBe(200)
  })

  const resetPasswordTokenInfo = { email }
  const resetPasswordToken = jwt.sign(
    resetPasswordTokenInfo,
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h'
    }
  )

  it('should changePassword', async () => {
    const response = await request.patch('/api/user/resetPassword').send({
      token: resetPasswordToken,
      newPassword
    })
    expect(response.status).toBe(200)
  })
})
