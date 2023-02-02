import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { allLocalesCodes } from "../server/localization/locales";
import { defaultLng } from "../server/localization/constants";

const i18nInit = async () => {
  const i18nInstanceFromServer = window.__i18nclient;
  const { language, store } = i18nInstanceFromServer;

  const i18nInstance = use(initReactI18next);
  await i18nInstance.init({
    debug: true,
    fallbackLng: defaultLng,
    lng: language,
    supportedLngs: allLocalesCodes,
    load: "currentOnly",
    ns: ["header", "search"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: store.data,
  });

  return i18nInstance;
};

export default i18nInit;
