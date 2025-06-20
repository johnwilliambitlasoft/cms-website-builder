import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    APP_KEY: process.env.APP_KEY,
    API_KEY: process.env.API_KEY,
    DOMAIN: process.env.DOMAIN,
  },
  images: {
    domains: [
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
