/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [{ key: "referrer-policy", value: "no-referrer" }]
			}
		];
	}
};

module.exports = nextConfig;
