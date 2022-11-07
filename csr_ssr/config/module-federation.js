const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { UniversalFederationPlugin } = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "shell",
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
    new UniversalFederationPlugin({
      name: "website2",
      library: { type: "commonjs-module" },
      isServer: true,
      remotes: {
        "@core":
          "core@https://agoras-df-dm-capp.wittybay-a2ac6d2d.centralus.azurecontainerapps.io/_next/static/ssr/remoteEntry.js",
      },
      filename: "remoteEntry.js",
      exposes: {},
    }),
  ],
};
