/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Eliminamos la configuración 'images: { unoptimized: true }' para activar la optimización
}

export default nextConfig
