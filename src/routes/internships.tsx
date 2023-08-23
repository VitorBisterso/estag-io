import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InternshipsPage from '@/components/pages/Internships';
import CreateInternshipPage from '@/components/pages/CreateInternship';
import { CREATE_INTERNSHIP_PAGE, INTERNSHIPS_PAGE } from '@/consts';

const Stack = createNativeStackNavigator();

export default function InternshipsRoutes() {
   return (
      <Stack.Navigator
         initialRouteName={INTERNSHIPS_PAGE}
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name={INTERNSHIPS_PAGE} component={InternshipsPage} />
         <Stack.Screen
            name={CREATE_INTERNSHIP_PAGE}
            component={CreateInternshipPage}
         />
      </Stack.Navigator>
   );
}
