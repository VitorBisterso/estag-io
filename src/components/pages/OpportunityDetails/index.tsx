import { Route } from '@react-navigation/native';

import { useGetOpportunityByIdQuery } from '@/services';
import Loader from '@/components/atoms/Loader';
import OpportunityDetailsTemplate from '@/components/templates/OpportunityDetails';
import { Opportunity } from '@/models/opportunities';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { id: number }>;
}

export default function OpportunityDetails({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { id } = route!.params;
   const { data: opportunity, isFetching } = useGetOpportunityByIdQuery(id);

   if (isFetching) return <Loader size={64} />;

   return (
      <OpportunityDetailsTemplate
         opportunity={opportunity ?? ({} as Opportunity)}
      />
   );
}
