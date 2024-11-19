/** @type {import('next').NextConfig} */
const repo = 'portfolio-static'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: assetPrefix,
    basePath: basePath,
};

export default nextConfig;
