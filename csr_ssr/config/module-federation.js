const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app1",
    remotes: {
      "@core":
        "core@https://agoras-df-dm-capp.wittybay-a2ac6d2d.centralus.azurecontainerapps.io/_next/static/chunks/remoteEntry.js",
    },
    shared: {
      react: { singleton: true, requiredVersion: deps["react-dom"] },
      "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
    },
  }),
  server: [
    new NextFederationPlugin({
      name: "shell",
      filename: "static/chunks/remoteEntry.js",
      remotes: {
        "@core":
          "core@https://agoras-df-dm-capp.wittybay-a2ac6d2d.centralus.azurecontainerapps.io/_next/static/ssr/remoteEntry.js",
      },
      shared: {},
    }),
  ],
};
