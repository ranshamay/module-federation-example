import { allLocalesCodes } from "./locales";
import { defaultLng, defaultNS } from "./constants";
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export default () =>
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      debug: true,
      supportedLngs: allLocalesCodes,
      fallbackLng: defaultLng,
      ns: [defaultNS],
      preload: allLocalesCodes,
      defaultNS: defaultNS,
      interpolation: {
        escapeValue: false, // not needed for react
      },
      backend: {
        loadPath: `https://agorasdfsaweu.blob.core.windows.net/localization/{{lng}}/{{ns}}.json`,
      },
      react: {
        useSuspense: false, // triggers warining in debug mode: access the t function before i18next.init
      },
    });
