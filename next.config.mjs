/** @type {import('next').NextConfig} */
const nextConfig = {
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