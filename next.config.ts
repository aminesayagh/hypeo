import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/services/foundations/internationalization/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
