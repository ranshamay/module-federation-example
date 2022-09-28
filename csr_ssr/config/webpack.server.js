const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");
module.exports = merge(shared, {
  name: "server",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    library: {
      name: "server",
      type: "var",
    },
    chunkLoading: "async-node",
    chunkFormat: "commonjs",
  },
  mode: "development",
  plugins: [...moduleFederationPlugin.server],
  externals: [
    function ({ context, request }, callback) {
      if (/^(react-dom|react)/.test(request)) {
        // Externalize to a commonjs module using the request path
        return callback(null, "commonjs " + request);
      }
      callback();
    },
  ],
});
