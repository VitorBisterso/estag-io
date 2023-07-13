import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import auth from '@/locale/pt/auth.json';
import common from '@/locale/pt/common.json';

i18n.use(initReactI18next).init({
   compatibilityJSON: 'v3',
   lng: 'pt',
   fallbackLng: 'pt',
   debug: false,
   ns: ['common'],
   defaultNS: 'common',
   keySeparator: false,
   interpolation: {
      escapeValue: false,
      formatSeparator: ',',
   },

   resources: {
      pt: common,
   },
});

i18n.addResourceBundle('pt', 'auth', auth);

export default i18n;
