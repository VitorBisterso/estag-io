import { Route } from '@react-navigation/native';

import Loader from '@/components/atoms/Loader';
import { useGetOpportunityByIdQuery } from '@/services';
import { Opportunity } from '@/models/opportunities';
import UpdateOpportunityTemplate from '@/components/templates/UpdateOpportunity';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { id: number }>;
}

export default function UpdateOpportunityPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { id } = route!.params;
   const { data: opportunity, isFetching } = useGetOpportunityByIdQuery(id);

   if (isFetching || Object.keys(opportunity ?? {}).length <= 0)
      return <Loader size={64} />;

   return (
      <UpdateOpportunityTemplate
         opportunity={opportunity ?? ({} as Opportunity)}
      />
   );
}
