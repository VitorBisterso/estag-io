import { View } from 'react-native';

import EmptyResults from '@/components/atoms/EmptyResults';
import Loader from '@/components/atoms/Loader';
import { useFilterContext } from '@/hooks/useFilter';
import { Company, ReviewFilter } from '@/models/reviews';
import Pagination from '@/components/molecules/Pagination';
import Gap from '@/components/atoms/Gap';
import { Text } from 'react-native-paper';
import styles from './styles';

interface Props {
   companies: Array<Company>;
   count: number;
   isLoading: boolean;
}

export default function CompaniesList({ companies, count, isLoading }: Props) {
   const { state, set } = useFilterContext<ReviewFilter>();

   if (isLoading) return <Loader size={64} />;

   if (companies && companies.length <= 0) return <EmptyResults />;

   const { page, size } = state;
   return (
      <>
         <Gap gap={24}>
            {companies.map((company) => (
               <Text>{company.name}</Text>
            ))}
         </Gap>
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
