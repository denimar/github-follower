import DatabaseConnection from './database/Connection'
const express = require('express');
const app = express();
const debug = require('debug')('app:server')
const port = process.env.PORT || 3000;
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const path = require('path');
import Routes from './Routes'
import cors from 'cors'
const loadJsonFile = require('load-json-file');

console.log('-------------------------------')
console.log('-------------------------------')
console.log(port)
console.log('-------------------------------')
console.log('-------------------------------')

app.use(cors());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (process.env.development) {
  const webpackCompiler = webpack(webpackConfig)

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(webpackCompiler, {
    logLevel: 'warn', publicPath: '/'
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(webpackCompiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

  app.use(express.static('public'))
} else {
  app.use(express.static('www'))
}

loadJsonFile('env.json').then(json => {
  app.envJSON = json

  //connect to MySQL
  DatabaseConnection.connect(app.envJSON)
    .then(sequelize => {
      Routes.init(app, sequelize);

      app.listen(port, () => {
        console.log(`>> Listening on port ${port}`)
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(() => {
      //silent exception
    })
});
