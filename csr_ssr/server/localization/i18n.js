import { allLocalesCodes } from "./locales";
import { defaultLng, defaultNS } from "./constants";
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export default async () => {
  const i18nInstance = await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      debug: true,
      supportedLngs: allLocalesCodes,
      fallbackLng: defaultLng,
      load: "currentOnly",
      ns: [defaultNS, "search"],
      preload: [defaultLng],
      defaultNS: defaultNS,
      interpolation: {
        escapeValue: false, // not needed for react
      },
      backend: {
        loadPath: `https://static.df.cloudmarketplace.microsoft.com/localization/{{lng}}/{{ns}}.json`,
      },
    });

  return i18nInstance;
};
