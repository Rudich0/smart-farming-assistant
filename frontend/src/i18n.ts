import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import neTranslation from './locales/ne/translation.json';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ne: {
        translation: neTranslation
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;