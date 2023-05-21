import { Request, Response } from 'express'
import getErrorMessage from '../utils/getErrorMessage'
import sendJudge from '../services/sendJudge.service'

export default async function quickJudgeHandler (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { source_code: sourceCode, language_id: languageId } = req.body

    const response = await sendJudge({ sourceCode, languageId })

    if (response.status !== 201) {
      res.status(400).json({
        message: 'Compile Error',
        stdout: response.data.stdout,
        stderr: response.data.stderr,
        time: response.data.time,
        memory: response.data.memory
      })
      return
    }

    res.status(200).json({
      message: 'Success Quick Judge',
      stdout: response.data.stdout,
      stderr: response.data.stderr,
      time: response.data.time,
      memory: response.data.memory
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err)
    })
  }
}
