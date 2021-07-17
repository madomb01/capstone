const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',

  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  module: {
    rules: [{
      test: '/\.js$/',
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new WorkboxPlugin.GenerateSW()
  ]

}
