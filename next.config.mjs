/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "yjss.org", // Replace with your image host
            pathname: "/img/**", // Adjust based on image path structure
          },
        ],
        domains: ["http://yjss.org"], // Add allowed hosts
      },
};

export default nextConfig;
