/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {dirs: ["src", "__tests__"]},
	output: "standalone",
	experimental: {
		serverActions: true
	}
};

module.exports = nextConfig;
