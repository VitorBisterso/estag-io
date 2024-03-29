import { View } from 'react-native';

import { Opportunity, OpportunityFilter } from '@/models/opportunities';
import Loader from '@/components/atoms/Loader';
import EmptyResults from '@/components/atoms/EmptyResults';
import Pagination from '@/components/molecules/Pagination';
import OpportunityCard from '@/components/molecules/OpportunityCard';
import { useFilterContext } from '@/hooks/useFilter';
import styles from './styles';

interface Props {
   opportunities: Array<Opportunity>;
   count: number;
   isLoading: boolean;
}

export default function OpportunitiesList({
   opportunities,
   count,
   isLoading,
}: Props) {
   const { state, set } = useFilterContext<OpportunityFilter>();

   if (isLoading) return <Loader size={64} />;

   if (opportunities && opportunities.length <= 0) return <EmptyResults />;

   const { page, size } = state;
   return (
      <>
         {opportunities?.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
         ))}
         <View style={styles.pagination}>
            <Pagination
               currentPage={page}
               pageSize={size}
               itemsCount={count}
               onChange={(newPageNumber) => set({ page: newPageNumber })}
            />
         </View>
      </>
   );
}
