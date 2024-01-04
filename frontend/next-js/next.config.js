/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_HOSTNAME}`,
      },
    ],
  },
};
