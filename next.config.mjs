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
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/photo-**',
            },
            // Ajoutez ce motif pour autoriser les images depuis localhost
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
