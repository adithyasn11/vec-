/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'], // Add domains where your images are hosted
    unoptimized: false,
  },
}

module.exports = nextConfig