import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Fix for workspace root warning
  outputFileTracingRoot: path.join(__dirname),
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
