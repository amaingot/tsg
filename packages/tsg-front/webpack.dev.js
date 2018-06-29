const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
  filename: 'css/bundle.css',
});

const vendorsExtractPlugin = new ExtractTextPlugin({
  filename: 'css/vendors.css',
});

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.jsx',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: [/.js$|.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 9000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    bundleExtractPlugin,
    vendorsExtractPlugin,
  ],
};
