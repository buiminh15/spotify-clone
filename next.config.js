/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dgfrvaqvnrnehqgvbrcr.supabase.co',
      },
    ]
  }
}

module.exports = nextConfig
