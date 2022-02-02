const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const config = require("./webpack.config");

module.exports = {
  mode: "production",
  entry: "./src/webpack-dev-server.js",
  plugins: [
    ...config[0].plugins,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: config[0].module,
  resolve: {
    extensions: [
      ".ts", // Add typescript support
      ".tsx", // Add typescript + react support
      ".js", // Preserving webpack default
      ".jsx", // Preserving webpack default
      ".json", // Preserving webpack default
      ".css", // Preserving webpack default
    ],
  },
};
