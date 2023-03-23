module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    eslint: {
      ignoreDuringBuilds: true,
    }
  }
  return nextConfig
}