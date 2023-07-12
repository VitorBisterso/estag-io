import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/locale';
import theme from '@/theme';

import AuthForms from '@/components/pages/Auth';

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <PaperProvider theme={theme}>
         <I18nextProvider i18n={i18n}>
            <NavigationContainer>
               <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="AuthForms" component={AuthForms} />
               </Stack.Navigator>
            </NavigationContainer>
            <Toast />
         </I18nextProvider>
      </PaperProvider>
   );
}
