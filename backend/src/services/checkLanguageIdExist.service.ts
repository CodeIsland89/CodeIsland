import axios from 'axios'

type FetchResponse = {
  id: number
  name: string
  is_archived: boolean
}

export default async function checkLanguageIdExist (
  langugageId: number
): Promise<boolean> {
  const judgeURL = process.env.JUDGE_URL
  if (judgeURL === undefined) throw new Error('Judge URL not found')
  const fetchURL = `${judgeURL}/languages/${langugageId}`
  try {
    const response = await axios.get<FetchResponse | undefined>(fetchURL)
    if (response.data === undefined || response.data.is_archived) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
