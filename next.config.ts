import { API_SERVER_BASE_URL } from "@/config/config";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${API_SERVER_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
