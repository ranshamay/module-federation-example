import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import i18n from "i18next";

// import { Helmet } from "react-helmet";
import App from "../src/components/App";
import {  initializeIcons, InjectionMode, resetIds, Stylesheet } from "@fluentui/react";

const stylesheet = Stylesheet.getInstance();

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
});

initializeIcons()

export default async (req, res, next) => {
  resetIds();

  // const i18nInstance = i18n.cloneInstance();
  // await i18nInstance.loadNamespaces(["resources"]);

  // await i18nInstance.changeLanguage("en");

  const sheet = Stylesheet.getInstance();
  const css = sheet.getRules(true);
  // const helmet = Helmet.renderStatic();
  let didError = false;
  const stream = renderToPipeableStream(<App />, {
    onAllReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      res.write(`<!DOCTYPE html`);
      res.write(`<html }>
      <head>
        ${`<style>${css}</style>`}
      </head>
      <body>`);
      res.write(`<div id="root">`);
      stream.pipe(res);
      res.write(`</div>`);
      res.write(
        `<script async data-chunk="main" src="http://localhost:3004/static/main.js"></script>`
      );
      res.write(`</body></html>`);
    },
    onShellError(err) {
      res.statusCode = 500;
      res.send(`<h1>An error occurred</h1>`);
      res.send(`<pre>${err}</pre>`);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });
};
