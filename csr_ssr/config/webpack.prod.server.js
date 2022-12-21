const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const server = require("./webpack.server");

module.exports = merge(shared, server, {
  mode: "production",
});
