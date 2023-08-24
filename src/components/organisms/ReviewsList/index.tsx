import { View } from 'react-native';

import EmptyResults from '@/components/atoms/EmptyResults';
import Loader from '@/components/atoms/Loader';
import { useFilterContext } from '@/hooks/useFilter';
import { Review, ReviewFilter } from '@/models/reviews';
import Pagination from '@/components/molecules/Pagination';
import { Text } from 'react-native-paper';
import styles from './styles';

interface Props {
   reviews: Array<Review>;
   count: number;
   isLoading: boolean;
}

export default function ReviewsList({ reviews, count, isLoading }: Props) {
   const { state, set } = useFilterContext<ReviewFilter>();

   if (isLoading) return <Loader size={64} />;

   if (reviews && reviews.length <= 0) return <EmptyResults />;

   const { page, size } = state;
   return (
      <>
         {reviews.map((review) => (
            <Text key={review.id}>
               {review.title} - {review.rating}
            </Text>
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
