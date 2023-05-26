import axios, { AxiosResponse } from 'axios'

type SendJudgeProps = {
  sourceCode: string
  languageId: number
}

type AxiosResponseType = {
  stdout: null | string
  time: number
  memory: number
  stderr: null | string
}

export default async function sendJudge ({
  sourceCode,
  languageId
}: SendJudgeProps): Promise<AxiosResponse<AxiosResponseType, any>> {
  const judgeURL = process.env.JUDGE_URL
  if (judgeURL === undefined) throw new Error('Judge URL not found')
  const fetchURL = `${judgeURL}/submissions/?base64_encoded=false&wait=true`

  const abortController = new AbortController()

  const timer = setTimeout(() => {
    abortController.abort()
    return new Error('Request timeout')
  }, 5000)

  const response = await axios.post<AxiosResponseType>(fetchURL, {
    source_code: sourceCode,
    language_id: languageId
  }, {
    signal: abortController.signal
  })

  clearTimeout(timer)

  return response
}
