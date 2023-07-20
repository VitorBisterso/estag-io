import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/store';
import {
   AUTH_PAGE,
   INTERNSHIPS_PAGE,
   LOGGED_PAGES,
   OPPORTUNITIES_PAGE,
   REVIEWS_PAGE,
   SPLASH_SCREEN_PAGE,
} from '@/consts';
import SplashScreenPage from '@/components/pages/SplashScreen';
import AuthPage from '@/components/pages/Auth';
import OpportunitiesPage from '@/components/pages/Opportunities';
import InternshipsPage from '@/components/pages/Internships';
import ReviewsPage from '@/components/pages/Reviews';
import TabBar from '@/components/molecules/TabBar';

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
         initialRouteName={OPPORTUNITIES_PAGE}
         screenOptions={{ headerShown: false }}
         // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
         tabBar={(props) => <TabBar {...props} />}
         backBehavior="history"
      >
         <Tab.Screen
            name={OPPORTUNITIES_PAGE}
            component={OpportunitiesPage}
            options={{
               tabBarLabel: t(`${profile}.opportunities`),
               // @ts-expect-error str is not a function
               tabBarIcon: 'briefcase',
            }}
         />
         <Tab.Screen
            name={INTERNSHIPS_PAGE}
            component={InternshipsPage}
            options={{
               tabBarLabel: t(`${profile}.internships`),
               // @ts-expect-error str is not a function
               tabBarIcon: 'school',
            }}
         />
         <Tab.Screen
            name={REVIEWS_PAGE}
            component={ReviewsPage}
            options={{
               tabBarLabel: t(`${profile}.reviews`),
               // @ts-expect-error str is not a function
               tabBarIcon: 'chart-line',
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
         <Stack.Screen name={LOGGED_PAGES} component={Tabs} />
      </Stack.Navigator>
   );
}
