/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [100, 75],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'holopin.me',
            port: '',
            pathname: '/supunsathsara/**',
          },
          {
            protocol: 'https',
            hostname: 'opengraph.githubassets.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
