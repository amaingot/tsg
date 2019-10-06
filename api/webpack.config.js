const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

// const layerPackageJson = require("./layer/package.json");
// const layerExternals = Object.keys(layerPackageJson.dependencies).reduce(
//   (result, currentDep) => {
//     return {
//       ...result,
//       [currentDep]: currentDep
//     };
//   },
//   {}
// );

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
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
};
