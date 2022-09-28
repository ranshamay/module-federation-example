const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(shared, {
  name: "client",
  target: "web",
  entry: [path.resolve(__dirname, "../src/index.js")],
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "auto",
  },
  plugins: [moduleFederationPlugin.client],
});
