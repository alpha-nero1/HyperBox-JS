const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hyperbox-js.js',
    library: {
      name: 'hyperbox-js',
      type: 'umd'
    }
  },
};
