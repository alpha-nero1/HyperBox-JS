const path = require('path');
const package = require('./package.json');
const filename = package.name;
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /./,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
  // Comment out for minification!
  optimization: {
    minimize: false
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.js`,
    library: {
      name: 'hyperbox-js',
      type: 'umd'
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: [".js"],
    modules: [path.join(__dirname, "src"), "node_modules"]
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
