const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  mode: 'development',
  entry: {
    client: [path.resolve(__dirname, '../src'), hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, '/../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: '#source-map',
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
        test: /\.(png|jpg|gif|svg)$/,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{from: 'public/index.html', to: path.resolve(__dirname, '/../dist'), force: true}])
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, "/../dist"),
    compress: true,
    port: 9002,
    hot: true,
    progress: false
  }
};
