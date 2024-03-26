/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/api/token",
                destination: "http://localhost:3001/api/token",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
