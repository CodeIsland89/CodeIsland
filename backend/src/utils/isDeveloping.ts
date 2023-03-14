export default function isDeveloping (): boolean {
  return (
    process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production'
  )
}
