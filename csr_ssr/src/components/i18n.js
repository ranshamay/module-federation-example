import { use } from 'i18next';
import { initReactI18next } from "react-i18next";
import { allLocalesCodes } from "../../server/localization/locales";
import { defaultLng } from '../../server/localization/constants';


const i18nInit = () => {
    const i18nInstanceFromServer = window.__i18nclient;
    const { language, store } = i18nInstanceFromServer;

    return use(initReactI18next).init({
        debug: true,
        fallbackLng: defaultLng,
        lng: language,
        supportedLngs: allLocalesCodes,
        ns: ['header', 'search'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: store.data,
    });
};

export default i18nInit;
