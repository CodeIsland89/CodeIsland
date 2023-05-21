import { request, server } from './index'

afterAll(() => {
  server.close()
})

describe('judge related Test', () => {
  it('should get quickJudgeResult', async () => {
    const correctResponse = await request.post('/api/judge/quickJudge').send({
      source_code: 'print("Hello World")',
      language_id: 70
    })
    expect(correctResponse.status).toBe(200)
    expect(correctResponse.body).toHaveProperty('message')
    expect(correctResponse.body).toHaveProperty('data')
    expect(correctResponse.body).toHaveProperty('error')

    const wrongResponse = await request.post('/api/judge/quickJudge').send({
      source_code: 'print("Hello World")',
      language_id: 999
    })
    expect(wrongResponse.status).toBe(404)
    expect(wrongResponse.body).toHaveProperty('errors')

    const compileErrorResponse = await request
      .post('/api/judge/quickJudge')
      .send({
        source_code: 'prin("Hello World")',
        language_id: 70
      })
    expect(compileErrorResponse.status).toBe(400)
    expect(compileErrorResponse.body).toHaveProperty('message')
    expect(compileErrorResponse.body).toHaveProperty('data')
    expect(compileErrorResponse.body).toHaveProperty('error')
  })
})
