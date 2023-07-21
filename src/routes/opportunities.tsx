import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OpportunitiesPage from '@/components/pages/Opportunities';
import { OPPORTUNITIES_PAGE } from '@/consts';

const Stack = createNativeStackNavigator();

export default function OpportunitiesRoutes() {
   return (
      <Stack.Navigator
         initialRouteName={OPPORTUNITIES_PAGE}
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen
            name={OPPORTUNITIES_PAGE}
            component={OpportunitiesPage}
         />
      </Stack.Navigator>
   );
}
