const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const client = require("./webpack.client");

module.exports = merge(shared, client, {
  mode: "production",
});
