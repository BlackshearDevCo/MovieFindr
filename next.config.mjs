/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "generated.vusercontent.net",
        port: "",
        pathname: "/placeholder.svg",
      },
    ],
  },
};

export default nextConfig;
