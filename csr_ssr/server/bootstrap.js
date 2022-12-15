import express from "express";

import serverEntry from "./server-entry";
import i18nInit from "./localization/i18n";

const app = express();
const PORT = 3001;

app.use("/static", express.static("./dist/client"));

i18nInit().then(() => {
  app.listen(PORT, () => {
    const serverRender = serverEntry();
    app.get("/*", serverRender);
    if (module.hot) {
      module.hot.accept("./index", () => {
        console.log("is hot reloading");
        require("./index");
      });
    }

    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
});
