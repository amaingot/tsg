const path = require("path");
const slsw = require("serverless-webpack");

const layerPackageJson = require("./layer/package.json");
const layerExternals = Object.keys(layerPackageJson.dependencies).reduce(
  (result, currentDep) => {
    return {
      ...result,
      [currentDep]: currentDep
    };
  },
  {}
);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  externals: slsw.lib.webpack.isLocal ? {} : layerExternals
};
