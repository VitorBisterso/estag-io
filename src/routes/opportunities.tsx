import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OpportunitiesPage from '@/components/pages/Opportunities';
import OpportunityDetails from '@/components/pages/OpportunityDetails';
import { OPPORTUNITIES_PAGE, OPPORTUNITY_DETAILS_PAGE } from '@/consts';

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
         <Stack.Screen
            name={OPPORTUNITY_DETAILS_PAGE}
            component={OpportunityDetails}
         />
      </Stack.Navigator>
   );
}
