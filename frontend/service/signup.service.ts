import env from '../utils/getEnvironmentVariables';

type Props = {
  nickname: string;
  email: string;
  password: string;
};

export default async function signUpService({ nickname, email, password }: Props): Promise<void> {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sendRegisterEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      email,
      password,
    }),
  });

  if (res.status !== 200) throw new Error('Failed to send register email');
}
