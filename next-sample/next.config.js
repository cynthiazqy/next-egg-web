/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/getPageInfo',
				destination: 'http://localhost:7001/api/getPageInfo',
			},
			{
				source: '/api/login',
				destination: 'http://localhost:3006/api/login',
			},
			{
				source: '/api/users',
				destination: 'http://localhost:3006/api/users',
			},
		]
	},
}

module.exports = nextConfig
