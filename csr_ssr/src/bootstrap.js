import App from "./components/App";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import i18n from "./i18n";
import { registerIcons, initializeIcons } from "@fluentui/react";
import { ApplicationInsights } from "./mocks/@microsoft/1ds-analytics-web-js";
import { mockedLogger } from "./mocks/logger";
import { getAccessTokenCB } from "./utils/RestClient";
import { v4 } from "uuid";
import { BuildDefinitionIcon } from "@fluentui/react-icons-mdl2";

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

initializeIcons();
registerIcons({ icons: { BuildDefinitionIcon: <BuildDefinitionIcon /> } });

async function hydrateClient() {
  // initialize app prerequisites before hydration
  const _1dsLogger = new ApplicationInsights();
  _1dsLogger.initialize(loggerConfig, []);
  let logger;
  let RestClient;

  try {
    logger = await import("@core/logger");
    logger.default.init(_1dsLogger, {
      correlationId: v4(),
      hostType: "Sample App - CSR_SSR",
    });
  } catch (e) {
    console.log("failed to load logger", e);
  }
  try {
    RestClient = await import("@core/RestClient");
    RestClient.default.init(mockedLogger, getAccessTokenCB);
  } catch (e) {
    console.log("failed to load restClient", e);
  }

  const i18nInstance = await i18n();
  const locale = getLocale();

  // hydrate app
  const container = document.getElementById("root");
  hydrateRoot(container, <App i18nInstance={i18nInstance} locale={locale} />, {
    onRecoverableError: () => {},
  });
}

hydrateClient();
