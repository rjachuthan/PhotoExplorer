/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.civitai.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "civitai.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
