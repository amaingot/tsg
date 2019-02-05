const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const S3_BUCKET_URL = "https://tsg.maingot.us/";
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || "production";
const ASSET_PATH = `${S3_BUCKET_URL}${CIRCLE_BRANCH}/`;

module.exports = env => {
  const baseConfig = {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            transpileOnly: env.dev || false
          }
        },
        {
          test: /\.(less|css|scss)$/,
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
          test: /\.svg$/,
          loader: "svg-inline-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        src: path.resolve(__dirname, "src/")
      }
    }
  };

  if (env.prod) {
    return {
      ...baseConfig,
      mode: "production",
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
          "process.env.CIRCLE_BRANCH": JSON.stringify(CIRCLE_BRANCH),
          "process.env.S3_BUCKET_URL": JSON.stringify(S3_BUCKET_URL)
        })
      ],
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: ASSET_PATH
      }
    };
  }

  if (env.dev) {
    return {
      ...baseConfig,
      mode: "development",
      devtool: "source-map",
      devServer: {
        historyApiFallback: true,
        hot: true,
        host: "localhost",
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: {
          key: fs.readFileSync("certs/localhost.key"),
          cert: fs.readFileSync("certs/localhost.crt")
        },
        port: 9000
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "https://localhost:9000/"
      }
    };
  }
};
