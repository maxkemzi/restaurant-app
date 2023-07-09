/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ["app", "components", "lib", "prisma", "__tests__"]
	},
	experimental: {
		serverActions: true
	}
};

module.exports = nextConfig;
