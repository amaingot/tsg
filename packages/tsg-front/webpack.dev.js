const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const baseConfig = require("./webpack.config");

module.exports = {
  ...baseConfig,
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: {
      key: fs.readFileSync("certs/localhost.key"),
      cert: fs.readFileSync("certs/localhost.crt")
    },
    port: 9000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "https://localhost:9000/"
  }
};
