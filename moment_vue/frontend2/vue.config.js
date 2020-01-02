var path = require("path")

module.exports = {
  outputDir : path.resolve(__dirname, "../backend/public/static"),
  devServer: {
		port:'8000',
		proxy: {
			'/moment': {
				target: 'http://127.0.0.1:3000/moment',
				changeOrigin: true,
				pathRewrite: {
					'^/moment': '',
				},
			},
    },
  }
}