import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Fix for workspace root warning
  outputFileTracingRoot: path.join(__dirname),
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
  
  // Configure for static export (GitHub Pages)
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/muthur-terminal' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/muthur-terminal/' : '',
  
  // Optimize images for static export
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
