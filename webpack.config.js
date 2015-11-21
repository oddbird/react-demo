/* eslint-env node */

'use strict';

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  // context for entry points
  context: path.join(__dirname, 'static', 'js'),
  // define all the entry point bundles
  entry: {
    app: './init.js',
    jquery: ['jquery'],
    react: [ 'react', 'react-dom' ],
  },
  output: {
    path: path.join(__dirname, 'static', 'dist', 'assets'),
    publicPath: '/assets/',
    filename: '[name].bundle.js'
  },
  resolve: {
    // where to look for "required" modules
    modulesDirectories: [
      'js',
      'templates',
      'sass',
      'static',
      'node_modules'
    ]
  },
  plugins: [
    // make jquery accessible in all modules that use it
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),
    // pull jquery and webpack runtime out of all bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery',
      minChunks: Infinity
    }),
    // pull react out of app bundle
    // do not include jquery, so that webpack runtime is not removed
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks: Infinity,
      chunks: [ 'app' ]
    }),
    // optimize modules used more often
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!postcss!sass?sourceMap')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015' ]
        }
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })
  ],
  devtool: 'cheap-module-source-map',
  debug: true
};
