/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
    // Disable image optimization for static exports
    unoptimized: process.env.NEXT_BUILD_TYPE === 'static',
  },
  // Optimize for static builds
  output: process.env.NEXT_BUILD_TYPE === 'static' ? 'export' : 
          process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  

  
  // Environment variables that will be available to the client
  env: {
    CAMPAIGN_DOMAIN: process.env.CAMPAIGN_DOMAIN,
    DEV_CAMPAIGN_DOMAIN: process.env.DEV_CAMPAIGN_DOMAIN,
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Add cache headers for better performance
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Specific cache headers for API routes and dynamic content
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  
  // Optimize bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add bundle analysis in production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          sanity: {
            name: 'sanity',
            test: /[\\/]node_modules[\\/](@sanity|sanity)[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          styled: {
            name: 'styled-components',
            test: /[\\/]node_modules[\\/]styled-components[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    
    return config;
  },
  
  // Add build-time information
  generateBuildId: async () => {
    const campaignDomain = process.env.CAMPAIGN_DOMAIN || 'default';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${campaignDomain}-${timestamp}`;
  },
}

module.exports = nextConfig
