/* eslint-disable no-process-env */

'use strict';

process.env.BROWSERSLIST_CONFIG = './.browserslistrc';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  context: path.join(__dirname, 'src', 'js'),
  entry: {
    app: './index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src/js'),
          path.join(__dirname, 'node_modules/@salesforce/design-system-react'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      {
        test: /\.(svg|gif|jpe?g|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 30 },
          },
        ],
      },
    ],
  },
  plugins: [new ExtractTextPlugin('[name].css')],
};
