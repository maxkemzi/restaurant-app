/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	eslint: {
		dirs: [
			"pages",
			"app",
			"components",
			"contexts",
			"prisma",
			"utils",
			"dtos",
			"__tests__"
		]
	}
};

module.exports = nextConfig;
