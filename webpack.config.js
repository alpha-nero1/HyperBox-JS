const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts'
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
    extensions: ['.js', '.ts'],
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  devtool: 'inline-source-map',
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
