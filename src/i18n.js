import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import engJson from "../public/language/en.json";
import ruJson from "../public/language/ru.json";
import uzJson from "../public/language/uz.json";

const resources = {
  en: {
    translation: engJson,
  },
  ru: {
    translation: ruJson,
  },
  uz: {
    translation: uzJson,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18n;
