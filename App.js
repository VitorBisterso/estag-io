import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
   PaperProvider,
   MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { I18nextProvider } from 'react-i18next';

import Main from '@/components/Main';
import i18n from '@/locale';

const Stack = createNativeStackNavigator();

const theme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: '#2F9E41',
      secondary: '#42CB58',
   },
};

export default function App() {
   return (
      <PaperProvider theme={theme}>
         <I18nextProvider i18n={i18n}>
            <NavigationContainer>
               <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={Main} />
               </Stack.Navigator>
            </NavigationContainer>
            <Toast />
         </I18nextProvider>
      </PaperProvider>
   );
}
