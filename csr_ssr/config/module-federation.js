const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { UniversalFederationPlugin } = require("@module-federation/node");

const generateRemotes = ({ isServer }) => {
  const remotes = {};
  const modules = [
    "core",
    "layout",
  ];
  modules.forEach((module) => {
    remotes[`@${module}`] = `${module}@https://static.df.cloudmarketplace.microsoft.com/artifacts/${module}/latest/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`;
  });
  return remotes;
}

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
      remotes: generateRemotes({ isServer: false }),
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
      remotes: generateRemotes({ isServer: true }),
      shared: {
        ...sharedModules
      },
      exposes: {},
    }),
  ],
};
