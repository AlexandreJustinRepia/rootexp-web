import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON: process.env.SUPABASE_ANON,
    RECAPTCHA_SITE: process.env.RECAPTCHA_SITE,
  }
};

export default nextConfig;
