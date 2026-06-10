/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'novex-images.storage.yandexcloud.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'basket-18.wbbasket.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.alicdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig