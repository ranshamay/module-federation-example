import { allLocalesCodes } from "./locales";
import { defaultLng, defaultNS } from "./constants";
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import axios from 'axios';
import { omitBy, isEmpty } from 'lodash'

const preloadTranslations = async () => {
  const combs = allLocalesCodes.reduce((acc, lng) => [...acc, ...['header', 'search'].map((ns) => [lng, ns])], []);

  const agorasRecources = await Promise.all(
    combs.map(async ([lng, ns]) => {
      const cloudmarketplaceStorageURL = new URL('https://static.df.cloudmarketplace.microsoft.com/');
      cloudmarketplaceStorageURL.pathname = `/localization/${lng}/${ns}.json`;
      const translations = axios
        .get(cloudmarketplaceStorageURL.toString())
        .catch((e) => {
          console.debug(`Importing agoras localization resources for: ${lng} failed, reason: ${e}`);
          return Promise.resolve([]);
        });
      return translations;
    })
  );


  agorasRecources.forEach((translationsResults, i) => {
    if (!isEmpty(translationsResults.data)) {

      const filteredTranslationResult = omitBy(translationsResults.data, (val, key) => key.endsWith('.comment'));
      i18n.addResources(combs[`${i}`][0], combs[`${i}`][1], filteredTranslationResult);
    }
  });


}

export default async () => {

  const i18nInstance = await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      debug: true,
      supportedLngs: allLocalesCodes,
      fallbackLng: defaultLng,
      ns: [defaultNS],
      preload: [defaultLng],
      defaultNS: defaultNS,
      interpolation: {
        escapeValue: false, // not needed for react
      },
      backend: {
        loadPath: `https://static.df.cloudmarketplace.microsoft.com/localization/{{lng}}/{{ns}}.json`,
      },
      react: {
        useSuspense: true,
      },

    });

  await preloadTranslations();

  return i18nInstance;
}