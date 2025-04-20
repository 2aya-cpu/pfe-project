const webpack = require("webpack");
const path = require("path");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },

  devServer: {
    client: {
      webSocketURL: "ws://0.0.0.0/", // Désactive WebSocket
    },
    proxy: {
      // ✅ Proxy API calls to your backend running on port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
};
