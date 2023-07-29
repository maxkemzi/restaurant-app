/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {dirs: ["src", "__tests__"]},
	experimental: {
		serverActions: true
	}
};

module.exports = nextConfig;
