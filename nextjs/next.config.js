/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  redirects: async () => {
    return [
      {
        source: "/:topic",
        destination: "/:topic/10",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
