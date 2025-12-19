/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'e-backend-1xjt.onrender.com',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '**',
            }
        ],
        domains: ['e-backend-1xjt.onrender.com', 'localhost'],
    },
}

module.exports = nextConfig