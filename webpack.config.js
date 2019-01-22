var path = require('path');

var config = {
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    library: "sr-visualizer",
    libraryTarget: "umd" // exposes and know when to use module.exports or exports
  },
  externals: {
    svg: 'svg.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};

module.exports = config;