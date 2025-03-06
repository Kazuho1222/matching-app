/** @type {import('next').NextConfig} */
const nextConfig = {
	// bcryptjsなどのNode.jsモジュールを使用するための設定
	transpilePackages: ["bcryptjs"],
	// Node.js環境でのみ実行
	experimental: {
		// 特定のルートを明示的にNode.js環境で実行
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},
	// デフォルトのruntime設定
	serverRuntimeConfig: {
		runtime: "nodejs",
	},
};

module.exports = nextConfig;
