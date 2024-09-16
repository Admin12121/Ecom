// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'http',
//                 hostname: 'localhost',
//                 port: '8000',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'assets.aceternity.com',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'images.unsplash.com',
//                 pathname: '/**',
//             },
//         ],
//     },
// };

// export default nextConfig;
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const pwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      });
    }
    return config;
  },
};

export default bundleAnalyzer(pwa(nextConfig));
