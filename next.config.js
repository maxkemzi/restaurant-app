/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ["pages", "app", "components", "lib", "prisma", "__tests__"]
	},
	experimental: {
		serverActions: true
	}
};

module.exports = nextConfig;
