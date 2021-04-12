import { LoggingUtils } from './logging/log-utils.js';

let startBoxServer = (dir) => {}

if (typeof require !== 'undefined' && typeof process !== 'undefined') {
  const express = require('express');
  const favicon = require('express-favicon');
  const path = require('path');
  const port = process.env.PORT || 2021;
  
  startBoxServer = (dir) => {
    const app = express();
    const pubDir = dir + '/public'
    const distDir = dir + '/dist'
    LoggingUtils.logBlue('HyperBox: starting up application...')
    const clearLoader = LoggingUtils.logLoader()
    app.use(favicon(pubDir + '/favicon.ico'));
    app.use(express.static(distDir));// send the user to index html page inspite of the url
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
    app.listen(port, () => {
      clearLoader()
      LoggingUtils.logGreen(`HyperBox: application running on port ${port} 🚀`);
    });
  }
}

export { startBoxServer }

