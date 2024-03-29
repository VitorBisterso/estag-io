import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OpportunitiesPage from '@/components/pages/Opportunities';
import OpportunityDetails from '@/components/pages/OpportunityDetails';
import CreateOpportunity from '@/components/pages/CreateOpportunity';
import UpdateOpportunity from '@/components/pages/UpdateOpportunity';
import ManageProcessStepsPage from '@/components/pages/ManageProcessSteps';
import CreateProcessStepPage from '@/components/pages/CreateProcessStep';
import UpdateProcessStepPage from '@/components/pages/UpdateProcessStep';
import InternshipsPage from '@/components/pages/Internships';
import CreateInternshipPage from '@/components/pages/CreateInternship';
import {
   CREATE_OPPORTUNTITY_PAGE,
   OPPORTUNITIES_PAGE,
   OPPORTUNITY_DETAILS_PAGE,
   MANAGE_PROCESS_STEPS_PAGE,
   UPDATE_OPPORTUNTITY_PAGE,
   CREATE_PROCESS_STEP_PAGE,
   UPDATE_PROCESS_STEP_PAGE,
   CREATE_INTERNSHIP_PAGE,
   INTERNSHIPS_PAGE,
} from '@/consts';

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
         <Stack.Screen
            name={CREATE_OPPORTUNTITY_PAGE}
            component={CreateOpportunity}
         />
         <Stack.Screen
            name={UPDATE_OPPORTUNTITY_PAGE}
            component={UpdateOpportunity}
         />
         <Stack.Screen
            name={MANAGE_PROCESS_STEPS_PAGE}
            component={ManageProcessStepsPage}
         />
         <Stack.Screen
            name={CREATE_PROCESS_STEP_PAGE}
            component={CreateProcessStepPage}
         />
         <Stack.Screen
            name={UPDATE_PROCESS_STEP_PAGE}
            component={UpdateProcessStepPage}
         />
         <Stack.Screen name={INTERNSHIPS_PAGE} component={InternshipsPage} />
         <Stack.Screen
            name={CREATE_INTERNSHIP_PAGE}
            component={CreateInternshipPage}
         />
      </Stack.Navigator>
   );
}
