import { Text } from 'react-native-paper';

import { Opportunity } from '@/models/opportunities';
import Loader from '@/components/atoms/Loader';
import EmptyResults from '@/components/atoms/EmptyResults';

interface Props {
   opportunities: Array<Opportunity>;
   isLoading: boolean;
}

export default function OpportunitiesList({ opportunities, isLoading }: Props) {
   if (isLoading) return <Loader size={64} />;

   if (opportunities && opportunities.length <= 0) return <EmptyResults />;

   return opportunities?.map((opportunity) => (
      <Text key={opportunity.title}>{opportunity.title}</Text>
   ));
}
