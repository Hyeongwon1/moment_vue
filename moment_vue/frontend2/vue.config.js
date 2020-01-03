var path = require("path")

module.exports = {
  outputDir : path.resolve(__dirname, "../backend/public/static"),
  devServer: {
		port:'8000',
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},   
		proxy: {
			'/moment': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/moment': '',
				},
			},
    },
  }
}