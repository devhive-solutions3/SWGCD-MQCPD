/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  }
  ,
  productionBrowserSourceMaps: false, // 🚫 disables .map requests in prod
}


export default nextConfig