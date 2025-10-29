// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
