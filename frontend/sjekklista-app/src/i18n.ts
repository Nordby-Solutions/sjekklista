import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import no from "./locales/no.json";

i18n
  .use(LanguageDetector) // Detect language from browser/localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "no"],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    resources: {
      en: { translation: en },
      no: { translation: no },
    },
  });

export default i18n;
