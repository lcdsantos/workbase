var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './assets/js',
    publicPath: './assets/js',
    filename: 'bundle.js'
  },
  externals: {
    // require("jquery") is external and available
    // on the global var jQuery
    'jquery': 'jQuery'
  },
  cache: true,
  debug: true,
  devtool: '#eval',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components|vendor/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};