import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import i18n from "i18next";
import App from "../src/components/App";
import { initializeIcons, InjectionMode, resetIds, Stylesheet } from "@fluentui/react";

const stylesheet = Stylesheet.getInstance();

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: "server"
});

initializeIcons()

export default async (req, res) => {
  resetIds();

  const locale = req.url.split('/')[1];
  const language = locale.split('-')[0];
  const i18nInstance = i18n.cloneInstance();
  await i18nInstance.changeLanguage(language);


  const i18nclient = {
    store: {
      data: {
        [i18nInstance.language]: i18nInstance.getDataByLanguage(i18nInstance.language),
      },
    },
    language: i18nInstance.language,
  }


  let didError = false;
  const stream = renderToPipeableStream(<App i18nInstance={i18nInstance} locale={locale} />, {
    bootstrapScripts: ['/static/main.js'],
    onAllReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      res.write(`<!DOCTYPE html>`);
      res.write(`<html>
      <head>
        <meta charset="UTF-8">
        <style>${stylesheet.getRules(true)}</style>
        <script>window.__i18nclient = ${JSON.stringify(i18nclient)}</script>
      </head>
      <body>`);
      res.write(`<div id="root">`);
      stream.pipe(res);
      res.write(`</div>`);
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
