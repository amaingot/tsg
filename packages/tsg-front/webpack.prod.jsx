import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET || '';
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || 'production';

const ASSET_PATH = `https://storage.googleapis.com/${GCLOUD_BUCKET}/front-assets/${CIRCLE_BRANCH}/`;

export default {
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
    publicPath: ASSET_PATH,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 400000,
    maxAssetSize: 1000000,
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new ExtractTextPlugin({
      filename: 'css/bundle.css',
    }),
    new ExtractTextPlugin({
      filename: 'css/vendors.css',
    }),
    new webpack.DefinePlugin({
      'process.env.CIRCLE_BRANCH': JSON.stringify(CIRCLE_BRANCH),
      'process.env.GCLOUD_BUCKET': JSON.stringify(GCLOUD_BUCKET),
    }),
  ],
};
