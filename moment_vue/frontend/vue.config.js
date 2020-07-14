var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: "8000",
    proxy: {
      "/v1": {
        target: "http://localhost:3000/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/v1": "",
        },
        // publicPath: {
        //   '^/v1': '',
        // }
      },
      "/uploads": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      // "/image": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      // },
      // "/font": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      // },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) =>
        Object.assign(options, {
          transformAssetUrls: {
            "v-img": ["src", "lazy-src"],
            "v-card": "src",
            "v-card-media": "src",
            "v-responsive": "src",
            "v-carousel-item": "src",
          },
        })
      );
  },
  outputDir: path.resolve(__dirname, "../backend/public/static"),
};
