const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config");

const S3_BUCKET_URL = process.env.S3_BUCKET_URL || "";
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || "production";

const ASSET_PATH = `${S3_BUCKET_URL}${CIRCLE_BRANCH}/`;

module.exports = {
  ...baseConfig,
  mode: "production",
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new webpack.NamedModulesPlugin(),
    // new ExtractTextPlugin({
    //   filename: "css/bundle.css"
    // }),
    // new ExtractTextPlugin({
    //   filename: "css/vendors.css"
    // }),
    new webpack.DefinePlugin({
      "process.env.CIRCLE_BRANCH": JSON.stringify(CIRCLE_BRANCH),
      "process.env.S3_BUCKET_URL": JSON.stringify(S3_BUCKET_URL)
    })
  ],
  output: {
    filename: "index.bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ASSET_PATH
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: false
    // maxEntrypointSize: 400000,
    // maxAssetSize: 1000000,
  }
};
