import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["ptcdn.info"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ]
    },
};

export default nextConfig;
