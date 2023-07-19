import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import Routes from '@/routes';
import i18n from '@/locale';
import theme from '@/theme';
import { setupStore } from '@/store';

export default function App() {
   return (
      <NavigationContainer>
         <PaperProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
               <Provider store={setupStore()}>
                  <Routes />
                  <Toast />
               </Provider>
            </I18nextProvider>
         </PaperProvider>
      </NavigationContainer>
   );
}
