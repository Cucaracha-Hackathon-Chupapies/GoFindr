/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const prod = process.env.PROD === "true"

const nextConfig = {
  reactStrictMode: false,
  env: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME ,
    BUCKET_ENDPOINT: process.env.BUCKET_ENDPOINT,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    PROD: process.env.PROD
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BUCKET_NAME + '.' + process.env.BUCKET_ENDPOINT,
        port: '',
        pathname: '/GoFindr/**'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/explorer"
      },
      {
        source: "/index",
        destination: "/explorer"
      },
    ]
  }
}

const PWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disableDevLogs: true,
  disable: prod ? false : true
})

module.exports = PWAConfig(nextConfig);