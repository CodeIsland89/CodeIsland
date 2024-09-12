import axios, { AxiosError } from 'axios';

export type QuickJudgeResult = AxiosResponse & {
  fontColor: `#${string}`
};

type AxiosResponse = {
  message: string,
  data: {
    stdout: string,
    stderr: string,
    time: number,
    memory: number,
  },
  error: string
};

function messageStrategy(status: number): {
  message: string,
  fontColor: `#${string}`
} {
  switch (status) {
    case 200:
      return {
        message: '執行成功',
        fontColor: '#51f57d',
      };
      break;

    case 400:
      return {
        message: '執行失敗',
        fontColor: '#ed3232',
      };
      break;

    case 404:
      return {
        message: '找不到該語言',
        fontColor: '#ed3232',
      };
      break;

    default:
      return {
        message: '未知錯誤',
        fontColor: '#ed3232',
      };
      break;
  }
}

function checkIsAxiosResponse(data: unknown): data is AxiosResponse {
  return (
    typeof data === 'object'
    && data !== null
    && 'message' in data
    && 'data' in data
    && 'error' in data
  );
}

export default async function quickJudgeService(
  sourceCode: string,
  language_id: number,
): Promise<QuickJudgeResult> {
  try {
    const response = await axios.post<AxiosResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/judge/quickJudge`, {
      source_code: sourceCode,
      language_id,
    });

    const { data } = response;
    const { message, fontColor } = messageStrategy(response.status);

    return {
      ...data,
      fontColor,
      message,
      data: {
        ...data.data,
        stderr: data.data.stderr === null ? '' : data.data.stderr,
        stdout: data.data.stdout === null ? '' : data.data.stdout,
      },
    };
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    const { data } = axiosError.response;

    const typeSafeData: AxiosResponse = checkIsAxiosResponse(data) ? data : {
      message: '因為未知的原因導致錯誤',
      data: {
        stdout: '',
        stderr: '',
        time: 0,
        memory: 0,
      },
      error: 'Failed Axios Error',
    };

    const { message, fontColor } = messageStrategy(axiosError.response.status);

    return {
      fontColor,
      message,
      error: 'Failed Axios Error',
      data: {
        ...typeSafeData.data,
        stderr: typeSafeData.data.stderr === null ? '' : typeSafeData.data.stderr,
        stdout: typeSafeData.data.stdout === null ? '' : typeSafeData.data.stdout,
      },
    };
  }
}
