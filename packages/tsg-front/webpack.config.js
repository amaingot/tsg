const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
  filename: 'css/bundle.css'
});

const vendorsExtractPlugin = new ExtractTextPlugin({
  filename: 'css/vendors.css'
});

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: [/.js$|.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    bundleExtractPlugin,
    vendorsExtractPlugin
  ]
};
