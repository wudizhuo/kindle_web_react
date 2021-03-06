var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }]
  }
};