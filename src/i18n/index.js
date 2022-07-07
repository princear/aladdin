import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import message from '../locales/en/messages.json';
import placeholders from '../locales/en/placeholders.json';
import placeholdersKn from "../locales/ku/placeholders.json";
import placeholdersAr from "../locales/ar/placeholders.json"
// import {getLocales} from 'react-native-localize';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        message: {
          ...message,
        },
        placeholders: {
          ...placeholders,
        },
      },
    },
    ku: {
      translation: {
        placeholders: {
          ...placeholdersKn,
        },
      },
    },
    ar: {
        translation: {
          placeholders: {
            ...placeholdersAr,
          },
        },
      },
  },
  debug:true
//   interpolation: {
//     escapeValue: false 
//   },
//   react: {
//     useSuspense:false,
//  }
});
export default i18n;
