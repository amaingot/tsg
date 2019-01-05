const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader"
      // },
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
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      styles: path.resolve(__dirname, "src/styles/"),
      pages: path.resolve(__dirname, "src/pages/"),
      routes: path.resolve(__dirname, "src/routes/"),
      static: path.resolve(__dirname, "src/static/"),
      store: path.resolve(__dirname, "src/store/"),
      utils: path.resolve(__dirname, "src/utils/")
    }
  }
};
