/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rcpfezkozgxkrvjjtluy.supabase.co',
      },
    ],
  },
};

export default nextConfig;