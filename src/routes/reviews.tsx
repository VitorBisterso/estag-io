import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
   COMPANIES_PAGE,
   COMPANY_DETAILS_PAGE,
   HANDLE_PROFILE_REVIEW,
   REVIEWS_PAGE,
} from '@/consts';
import HandleProfileReviewPage from '@/components/pages/HandleProfileReview';
import ReviewsPage from '@/components/pages/Reviews';
import CompaniesPage from '@/components/pages/Companies';
import CompanyDetailsPage from '@/components/pages/CompanyDetails';

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
         <Stack.Screen name={REVIEWS_PAGE} component={ReviewsPage} />
         <Stack.Screen name={COMPANIES_PAGE} component={CompaniesPage} />
         <Stack.Screen
            name={COMPANY_DETAILS_PAGE}
            component={CompanyDetailsPage}
         />
      </Stack.Navigator>
   );
}
