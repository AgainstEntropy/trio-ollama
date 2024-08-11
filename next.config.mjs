/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // async rewrites() {
    //     return [
    //         {
    //             source: '/fastapi/:path*',
    //             destination: 'http://localhost:8000/:path*', // Proxy to FastAPI Backend
    //         }
    //     ]
    // },
};

export default nextConfig;
