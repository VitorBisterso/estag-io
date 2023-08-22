import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from '@/locale/pt/common.json';
import auth from '@/locale/pt/auth.json';
import internships from '@/locale/pt/internships.json';
import multiselect from '@/locale/pt/multiselect.json';
import opportunities from '@/locale/pt/opportunities.json';
import processSteps from '@/locale/pt/processSteps.json';
import tabs from '@/locale/pt/tabs.json';
import toast from '@/locale/pt/toast.json';

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
i18n.addResourceBundle('pt', 'internships', internships);
i18n.addResourceBundle('pt', 'multiselect', multiselect);
i18n.addResourceBundle('pt', 'opportunities', opportunities);
i18n.addResourceBundle('pt', 'processSteps', processSteps);
i18n.addResourceBundle('pt', 'tabs', tabs);
i18n.addResourceBundle('pt', 'toast', toast);

export default i18n;
