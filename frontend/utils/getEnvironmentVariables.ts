export type EnvironmentVariables = {
  NEXT_PUBLIC_BACKEND_URL
};

const env: EnvironmentVariables = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export default env;
