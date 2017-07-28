const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/css/app.scss', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: __dirname,
        query: {
          presets: ['es2015']
        }
      }
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      __dirname + '/src'
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
