import axios from 'axios';

export type QuickJudgeResult = {
  message: string,
  data: {
    stdout: string,
    stderr: string,
    time: number,
    memory: number,
  },
  error: ''
};

function messageStrategy(status: number) {
  switch (status) {
    case 200:
      return '執行成功';
      break;

    case 400:
      return '執行失敗';
      break;

    case 404:
      return '該程式語言不存在';
      break;

    default:
      return '伺服器錯誤';
      break;
  }
}

export default async function quickJudgeService(sourceCode: string, language_id: number) {
  const response = await axios.post<QuickJudgeResult>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/judge/quickJudge`, {
    source_code: sourceCode,
    language_id,
  });

  const { data } = response;
  const newMessage = messageStrategy(response.status);
  data.message = newMessage;

  if (data.data.stderr === null) {
    data.data.stderr = '';
  }

  if (data.data.stdout === null) {
    data.data.stdout = '';
  }

  return data;
}
