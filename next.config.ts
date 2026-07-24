import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/medismart",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/medismart",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
