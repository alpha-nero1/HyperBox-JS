const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 2021;

module.exports = (dir) => {
  const app = express();
  const srcDir = dir + '/src';
  const pubDir = dir + '/public'
  console.log(`HyperBox: starting up application...`)
  app.use(favicon(pubDir + '/favicon.ico'));
  app.use(express.static(srcDir));// send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(srcDir, 'index.html'));
  });
  app.listen(port, () => {
    console.log(`HyperBox: application running on port ${port} 🚀`)
  });
}
