const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { UniversalFederationPlugin } = require("@module-federation/node");

const sharedModules = {
  "@fluentui/react": {
    singleton: true,
  },
  i18next: {
    singleton: true,
  },
  "react-i18next": {
    singleton: true
  }

}

module.exports = {
  client: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        "@core": "core@https://static.df.cloudmarketplace.microsoft.com/artifacts/core/090d5aea65da733eb51ae33877913b2d82d80256/_next/static/chunks/remoteEntry.js",
        "@layout": "layout@https://static.df.cloudmarketplace.microsoft.com/artifacts/layout/cc658975931361e5de2fd3a032c96eceffd99253/_next/static/chunks/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
        ...sharedModules
      },
    }),
  ],
  server: [
    new UniversalFederationPlugin({
      name: "website2",
      library: { type: "commonjs-module" },
      isServer: true,
      remotes: {
        "@core":
          "core@https://static.df.cloudmarketplace.microsoft.com/artifacts/core/090d5aea65da733eb51ae33877913b2d82d80256/_next/static/ssr/remoteEntry.js",
        "@layout":
          "layout@https://static.df.cloudmarketplace.microsoft.com/artifacts/layout/cc658975931361e5de2fd3a032c96eceffd99253/_next/static/ssr/remoteEntry.js",
      },
      shared: {
        ...sharedModules
      },
      exposes: {},
    }),
  ],
};
