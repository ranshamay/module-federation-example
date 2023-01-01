import App, { mockedLogger } from "./components/App";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import i18n from "./i18n";
import { initializeIcons } from "@fluentui/react";
import { ApplicationInsights } from "@microsoft/1ds-analytics-web-js";
import { getAccessTokenCB } from "./utils/RestClient";
import RestClient from "@core/RestClient";
import logger from "@core/logger";

import "./index.css";

const loggerConfig = {
  instrumentationKey: "PUT_INSTRUMENTATION_KEY_HERE",
  perfEvtsSendAll: true,
};

function getLocale() {
  const defaultLocale = "en-US";
  try {
    return window.location.pathname.split("/")[1] || defaultLocale;
  } catch {
    return defaultLocale;
  }
}

async function hydrateClient() {
  // initialize app prerequisites before hydration
  const _1dsLogger = new ApplicationInsights();
  _1dsLogger.initialize(loggerConfig, []);
  logger.init(_1dsLogger);
  RestClient.init(mockedLogger, getAccessTokenCB);
  initializeIcons();
  const i18nInstance = await i18n();
  const locale = getLocale();

  // hydrate app
  const container = document.getElementById("root");
  hydrateRoot(container, <App i18nInstance={i18nInstance} locale={locale} />);
}

hydrateClient();
