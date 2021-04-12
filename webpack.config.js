const path = require('path');
const package = require('./package.json');
const filename = package.name;

module.exports = {
  entry: {
    index: './src/index.js'
  },
  optimization: {
    minimize: false
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: 'hyperbox-js',
      type: 'umd'
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: [".js"]
  },
  devtool: 'source-map',
  externals: {
    'express-favicon': {
      commonjs: 'express-favicon',
      commonjs2: 'express-favicon',
      amd: 'express-favicon',
      root: 'express-favicon',
    },
    path: {
      commonjs: 'path',
      commonjs2: 'path',
      amd: 'path',
      root: 'path',
    },
    express: {
      commonjs: 'express',
      commonjs2: 'express',
      amd: 'express',
      root: 'express',
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: __dirname + "/src",
        resolve: {
          fullySpecified: false
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};
