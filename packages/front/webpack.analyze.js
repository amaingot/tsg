const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpack = require("webpack");

const baseConfig = require("./webpack.config");

module.exports = {
  ...baseConfig,
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
