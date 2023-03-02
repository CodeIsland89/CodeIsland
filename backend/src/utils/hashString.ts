import crypto from 'crypto'

export default function hashString (string: string): string {
  return crypto.createHash('sha256').update(string, 'utf8').digest('hex')
}
