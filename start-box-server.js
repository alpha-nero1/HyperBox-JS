const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 2021;

module.exports = (dir) => {
  const app = express();
  console.log(`HyperBox: starting up application...`)
  app.use(favicon(dir + '/public/favicon.ico'));
  app.use(express.static(dir));// send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dir, 'index.html'));
  });
  app.listen(port, () => {
    console.log(`HyperBox: application running on port ${port} 🚀`)
  });
}
