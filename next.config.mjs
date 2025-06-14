/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.ctfassets.net",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "yjss.org",
            pathname: "/img/**",
          },
        ],
        domains: ["http://yjss.org", "images.ctfassets.net"],
      },
};

export default nextConfig;
