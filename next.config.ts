import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allow images from placehold.co
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
