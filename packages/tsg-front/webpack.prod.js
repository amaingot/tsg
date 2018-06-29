const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
  filename: 'css/bundle.css',
});

const vendorsExtractPlugin = new ExtractTextPlugin({
  filename: 'css/vendors.css',
});

module.exports = {
  mode: 'production',
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
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    bundleExtractPlugin,
    vendorsExtractPlugin,
  ],
};
