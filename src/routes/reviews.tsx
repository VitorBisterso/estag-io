import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COMPANIES_PAGE, HANDLE_PROFILE_REVIEW, REVIEWS_PAGE } from '@/consts';
import HandleProfileReviewPage from '@/components/pages/HandleProfileReview';
import ReviewsPage from '@/components/pages/Reviews';
import CompaniesPage from '@/components/pages/Companies';

const Stack = createNativeStackNavigator();

export default function ReviewsRoutes() {
   return (
      <Stack.Navigator
         initialRouteName={HANDLE_PROFILE_REVIEW}
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen
            name={HANDLE_PROFILE_REVIEW}
            component={HandleProfileReviewPage}
         />
         <Stack.Screen name={COMPANIES_PAGE} component={CompaniesPage} />
         <Stack.Screen name={REVIEWS_PAGE} component={ReviewsPage} />
      </Stack.Navigator>
   );
}
