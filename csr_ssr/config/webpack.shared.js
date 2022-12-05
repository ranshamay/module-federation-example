const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
            },
          },
        ],
      },
    ],
  },
};
