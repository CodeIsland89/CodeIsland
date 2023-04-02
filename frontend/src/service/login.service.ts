import env from '../utils/getEnvironmentVariables';

type Props = {
  email: string;
  password: string;
};

export default async function loginService({ email, password }: Props): Promise<string> {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status !== 200) {
    throw new Error('Failed to login');
  }

  const { token } = await res.json();

  return token;
}
