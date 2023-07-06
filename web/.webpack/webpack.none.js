const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = () => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules\/bootstrap/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
});
