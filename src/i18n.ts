
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "all": "All",
      "music": "Music",
      "podcasts": "Podcasts",
      "madeFor": "Made For {{name}}",
      "todaysBiggestHits": "Today's biggest hits",
      "showAll": "Show all",
      "dailyMix": "Daily Mix",
      "discoverWeekly": "Discover Weekly",
      "yourWeeklyMixOfFresh": "Your weekly mix of fresh research papers",
    }
  },
  hi: {
    translation: {
      "all": "सभी",
      "music": "संगीत",
      "podcasts": "पॉडकास्ट",
      "madeFor": "{{name}} के लिए",
      "todaysBiggestHits": "आज के टॉप शोध",
      "showAll": "सभी दिखाएं",
      "dailyMix": "दैनिक मिश्रण",
      "discoverWeekly": "साप्ताहिक खोज",
      "yourWeeklyMixOfFresh": "नए शोध पत्रों का साप्ताहिक संग्रह",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
