import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from '@/locale';
import theme from '@/theme';
import { setupStore } from '@/store';

import AuthForms from '@/components/pages/Auth';

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <PaperProvider theme={theme}>
         <I18nextProvider i18n={i18n}>
            <Provider store={setupStore()}>
               <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                     <Stack.Screen name="AuthForms" component={AuthForms} />
                  </Stack.Navigator>
               </NavigationContainer>
               <Toast />
            </Provider>
         </I18nextProvider>
      </PaperProvider>
   );
}
