/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
