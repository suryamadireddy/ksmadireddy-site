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
      {
        source: "/ksm-studio",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/ksm-studio/:path*",
        destination: "/atelier/:path*",
        permanent: true,
      },
      {
        source: "/thekiln",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/thekiln/:path*",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/kiln",
        destination: "/atelier",
        permanent: true,
      },
      {
        source: "/kiln/:path*",
        destination: "/atelier",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
