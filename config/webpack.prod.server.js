const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const nodeExternals = require('webpack-node-externals');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'production',
  entry: {
    server: [path.resolve(__dirname, '../server/main.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  externals: nodeModules,
  /*
  externals: [
    nodeExternals()
  ],
  */
  plugins: [
    new CopyWebpackPlugin([
      {from: 'env.json', to: path.join(__dirname, '../dist'), force: true},
    ])
  ]
};
