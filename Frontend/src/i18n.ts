// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { atlas: "Atlas", dashboard: "Dashboard", upload: "Upload", login: "Login", signup: "Sign Up", logout: "Logout" } },
  hi: { translation: { atlas: "एटलस", dashboard: "डैशबोर्ड", upload: "अपलोड", login: "लॉगिन", signup: "साइन अप", logout: "लॉगआउट" } },
  bn: { translation: { atlas: "অ্যাটলাস", dashboard: "ড্যাশবোর্ড", upload: "আপলোড", login: "লগইন", signup: "সাইন আপ", logout: "লগআউট" } },
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
