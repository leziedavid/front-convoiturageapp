/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: 'another-example.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '195.110.35.237',
                port: '4000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '195.110.35.237',
                port: '4000',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
