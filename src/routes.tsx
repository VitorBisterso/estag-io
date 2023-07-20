import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AUTH_PAGE, OPPORTUNITIES_PAGE, SPLASH_SCREEN_PAGE } from '@/consts';
import SplashScreenPage from '@/components/pages/SplashScreen';
import AuthPage from '@/components/pages/Auth';
import OpportunitiesPage from '@/components/pages/Opportunities';

const Stack = createNativeStackNavigator();

export default function Routes() {
   return (
      <Stack.Navigator
         initialRouteName={SPLASH_SCREEN_PAGE}
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name={SPLASH_SCREEN_PAGE} component={SplashScreenPage} />
         <Stack.Screen name={AUTH_PAGE} component={AuthPage} />
         <Stack.Screen
            name={OPPORTUNITIES_PAGE}
            component={OpportunitiesPage}
         />
      </Stack.Navigator>
   );
}
