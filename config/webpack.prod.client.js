const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    client: path.resolve(__dirname, '../src')
  },
  output: {
    path: path.resolve(__dirname, '../dist/www'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react', 'env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
  	  {
  		  test: /\.scss$/,
  		  use: [
  		    {
  		  	  loader: "style-loader"
  		    },
  		    {
    			  loader: "css-loader",
  	  		  options: {
  		  	    sourceMap: true
  			    }
  		    },
  		    {
  			    loader: "sass-loader",
            options: {
  			      sourceMap: true
  			    }
  		    }
  	   	]
  	  },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: 'public', to: path.join(__dirname, '../dist/www'), force: true}
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
