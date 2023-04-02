export default function getBackendBaseURL (): string {
  const hostURL = process.env.RENDER_EXTERNAL_HOSTNAME // foobar.onrender.com
  if (hostURL !== undefined) return `https://${hostURL}`
  return 'http://localhost:3001'
}
