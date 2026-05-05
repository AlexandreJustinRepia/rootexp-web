import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON: process.env.SUPABASE_ANON,
    RECAPTCHA_SITE: process.env.RECAPTCHA_SITE,
    OFFICIAL_DOWNLOAD_URL: process.env.OFFICIAL_DOWNLOAD_URL,
    ALTERNATIVE_DOWNLOAD_URL: process.env.ALTERNATIVE_DOWNLOAD_URL,
    APK_PURE_URL: process.env.APK_PURE_URL,
    APP_VERSION: process.env.APP_VERSION,
    DEVELOPER_NAME: process.env.DEVELOPER_NAME,
  }
};

export default nextConfig;
