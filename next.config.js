/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.countryflagicons.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "guerfzlhzjrpooirzvlf.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
