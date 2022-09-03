/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    APP_NAME: 'NODE-REACT-AWS',
    API:'http://localhost:8000/api',
    PRODUCTION: false,
    DOMAIN: 'http://localhost:3000',
    FB_APP_ID: 'lakjsdhasdjhgapeogsdss'
  }
};

module.exports = nextConfig



