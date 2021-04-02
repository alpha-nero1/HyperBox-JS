const { Box } = require('./box');
const CoreBoxes = require('./core-boxes');
const startBoxServer = require('./start-box-server');

module.exports = {
  Box,
  ...CoreBoxes,
  startBoxServer
}