/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [100, 75],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'holopin.me',
            port: '',
            pathname: '/supunsathsara/**',
          },
        ],
      },
}

module.exports = nextConfig
