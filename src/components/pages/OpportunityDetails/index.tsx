import { Route } from '@react-navigation/native';

import { useGetOpportunityByIdQuery } from '@/services/opportunities';
import Loader from '@/components/atoms/Loader';
import OpportunityDetailsTemplate from '@/components/templates/OpportunityDetails';
import { Opportunity } from '@/models/opportunities';

interface Props {
   route: Route<string, { id: number }>;
}

export default function OpportunityDetails({ route }: Props) {
   const { id } = route.params;
   const { data: opportunity, isFetching } = useGetOpportunityByIdQuery(id);

   if (isFetching) return <Loader size={64} />;

   return (
      <OpportunityDetailsTemplate
         opportunity={opportunity ?? ({} as Opportunity)}
      />
   );
}
