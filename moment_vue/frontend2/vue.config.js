var path = require("path")

module.exports = {
  outputDir : path.resolve(__dirname, "../backend/public/"),
  devServer: {
		proxy: {
			'/moment': {
				target: 'http://localhost:8081/moment',
				changeOrigin: true,
				pathRewrite: {
					'^/moment': '',
				},
			},
    },
  },  
  "transpileDependencies": [
    "vuetify"
  ]
}