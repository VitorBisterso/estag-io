import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
   PaperProvider,
   MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import Main from '@/components/Main';

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
         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen name="Home" component={Main} />
            </Stack.Navigator>
         </NavigationContainer>
         <Toast />
      </PaperProvider>
   );
}
