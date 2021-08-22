var path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

var config = {
  mode: "production",
  entry: __dirname + "/src/index.ts",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    filename: "srVisualizer.min.js",
    library: "sr-visualizer",
    libraryTarget: "umd", // exposes and know when to use module.exports or exports
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  }
};

module.exports = config;