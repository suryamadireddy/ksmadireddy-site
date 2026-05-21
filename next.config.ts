import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/globetrotter",
        destination: "/meridian/globetrotter",
        permanent: true,
      },
      {
        source: "/globetrotter/:path*",
        destination: "/meridian/globetrotter/:path*",
        permanent: true,
      },
      {
        source: "/atlas",
        destination: "/meridian/atlas",
        permanent: true,
      },
      {
        source: "/atlas/:path*",
        destination: "/meridian/atlas/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
