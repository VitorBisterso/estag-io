import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/store';
import {
   AUTH_PAGE,
   LOGGED_ROUTES,
   OPPORTUNITIES_ROUTES,
   SPLASH_SCREEN_PAGE,
   INTERNSHIPS_ICON,
   OPPORTUNITIES_ICON,
   COMPANY_REVIEWS_ICON,
   USER_REVIEWS_ICON,
   INTERNSHIPS_ROUTES,
   REVIEWS_ROUTES,
} from '@/consts';
import TabBar from '@/components/molecules/TabBar';
import SplashScreenPage from '@/components/pages/SplashScreen';
import AuthPage from '@/components/pages/Auth';

import OpportunitiesRoutes from './opportunities';
import InternshipsRoutes from './internships';
import ReviewsRoutes from './reviews';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
   const { t } = useTranslation('tabs');
   const { profile: storedProfile } = useSelector(
      (state: RootState) => state.ProfileSlice,
   );

   const profile = storedProfile.toLowerCase();
   return (
      <Tab.Navigator
         sceneContainerStyle={{ backgroundColor: 'white' }}
         initialRouteName={OPPORTUNITIES_ROUTES}
         screenOptions={{ headerShown: false }}
         // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
         tabBar={(props) => <TabBar {...props} />}
         backBehavior="history"
      >
         <Tab.Screen
            name={OPPORTUNITIES_ROUTES}
            component={OpportunitiesRoutes}
            options={{
               tabBarLabel: t(`${profile}.opportunities`),
               // @ts-expect-error str is not a function
               tabBarIcon: OPPORTUNITIES_ICON,
            }}
         />
         <Tab.Screen
            name={INTERNSHIPS_ROUTES}
            component={InternshipsRoutes}
            options={{
               tabBarLabel: t(`${profile}.internships`),
               // @ts-expect-error str is not a function
               tabBarIcon: INTERNSHIPS_ICON,
            }}
         />
         <Tab.Screen
            name={REVIEWS_ROUTES}
            component={ReviewsRoutes}
            options={{
               tabBarLabel: t(`${profile}.reviews`),
               // @ts-expect-error str is not a function
               tabBarIcon:
                  profile === 'COMPANY'
                     ? COMPANY_REVIEWS_ICON
                     : USER_REVIEWS_ICON,
            }}
         />
      </Tab.Navigator>
   );
}

export default function Routes() {
   return (
      <Stack.Navigator
         initialRouteName={SPLASH_SCREEN_PAGE}
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name={SPLASH_SCREEN_PAGE} component={SplashScreenPage} />
         <Stack.Screen name={AUTH_PAGE} component={AuthPage} />
         <Stack.Screen name={LOGGED_ROUTES} component={Tabs} />
      </Stack.Navigator>
   );
}
