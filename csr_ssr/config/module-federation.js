const package = require("../package.json");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const { UniversalFederationPlugin } = require("@module-federation/node");

const sharedModules = {
  react: {
    eager: true,
    requiredVersion: package.dependencies["react"],
  },
  "react-dom": {
    eager: true,
    requiredVersion: package.dependencies["react-dom"],
  },
  "@fluentui/react": {
    singleton: true,
    requiredVersion: package.dependencies["@fluentui/react"],
  },
  i18next: {
    singleton: true,
  },
  "react-i18next": {
    singleton: true,
  },
};

module.exports = {
  client: [
    new ModuleFederationPlugin({
      name: "csr-shell",
      remotes: {
        "@core":
          "core@https://static.df.cloudmarketplace.microsoft.com/artifacts/core/latest/_next/static/chunks/remoteEntry.js",
        "@layout":
          "layout@https://static.df.cloudmarketplace.microsoft.com/artifacts/layout/latest/_next/static/chunks/remoteEntry.js",
      },
      shared: sharedModules,
    }),
  ],
  server: [
    new UniversalFederationPlugin({
      name: "ssr-shell",
      library: { type: "commonjs-module" },
      isServer: true,
      remotes: {
        "@core":
          "core@https://static.df.cloudmarketplace.microsoft.com/artifacts/core/latest/_next/static/ssr/remoteEntry.js",
        "@layout":
          "layout@https://static.df.cloudmarketplace.microsoft.com/artifacts/layout/latest/_next/static/ssr/remoteEntry.js",
      },
      shared: sharedModules,
    }),
  ],
};
