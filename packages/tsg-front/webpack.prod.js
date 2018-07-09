const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET || "";
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || "production";

const ASSET_PATH = `https://storage.googleapis.com/${GCLOUD_BUCKET}/front-assets/${CIRCLE_BRANCH}/`;

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: { javascriptEnabled: true } // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
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
      "process.env.GCLOUD_BUCKET": JSON.stringify(GCLOUD_BUCKET)
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
