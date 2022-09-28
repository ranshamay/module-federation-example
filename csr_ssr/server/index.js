const express = require("express");
const initMiddleware = require("./middleware");
const fetch = require("node-fetch").default;

global.fetch = fetch;
const app = express();
const PORT = 3004;

const done = () => {
  app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
};

if (module.hot) {
  module.hot.accept("./index", () => {
    console.log("is hot reloading");
    require("./index");
  });
}

initMiddleware(express, app, done);

module.exports = app;
