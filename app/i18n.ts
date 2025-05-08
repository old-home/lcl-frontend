import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['navigator', 'localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
    ns: ['Auth'],
    defaultNS: 'Auth',
    // Disable features that require SSR
    react: {
      useSuspense: false,
    },
    // Configure backend to load language files from the correct location
    backend: {
      loadPath: '/lang/{{ns}}/{{lng}}.json',
      crossDomain: false,
    },
  })

export default i18n
