/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Se ha eliminado la clave 'images: { unoptimized: true }' para habilitar la optimización.
}

export default nextConfig
