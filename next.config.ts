import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clever-egret-901.convex.cloud",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;