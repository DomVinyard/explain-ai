/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  redirects: async () => {
    return [
      {
        source: "/:slug",
        destination: "/:slug/10",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
