/** @type {import('next').NextConfig} */

const repo = "portfolio-static";
assetPrefix = `/${repo}/`;
basePath = `/${repo}`;

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: assetPrefix,
    basePath: basePath,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
