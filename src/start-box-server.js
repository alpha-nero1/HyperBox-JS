const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 2021;

export default (dir) => {
  const app = express();
  const pubDir = dir + '/public'
  const distDir = dir + '/dist'
  console.log(`HyperBox: starting up application...`)
  app.use(favicon(pubDir + '/favicon.ico'));
  app.use(express.static(distDir));// send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });
  app.listen(port, () => {
    console.log(`HyperBox: application running on port ${port} 🚀`)
  });
}
