import { View } from 'react-native';

import EmptyResults from '@/components/atoms/EmptyResults';
import Loader from '@/components/atoms/Loader';
import { useFilterContext } from '@/hooks/useFilter';
import { Review, ReviewFilter } from '@/models/reviews';
import Pagination from '@/components/molecules/Pagination';
import ReviewInfo from '@/components/molecules/ReviewInfo';
import Gap from '@/components/atoms/Gap';
import styles from './styles';

interface Props {
   reviews: Array<Review>;
   count?: number;
   isLoading?: boolean;
   withPagination?: boolean;
}

export default function ReviewsList({
   reviews,
   count,
   isLoading,
   withPagination,
}: Props) {
   const { state, set } = useFilterContext<ReviewFilter>();

   if (isLoading) return <Loader size={64} />;

   if (reviews && reviews.length <= 0) return <EmptyResults />;

   const { page, size } = state;
   return (
      <>
         <Gap gap={24}>
            {reviews.map((review) => (
               <ReviewInfo key={review.id} review={review} />
            ))}
         </Gap>
         {withPagination && (
            <View style={styles.pagination}>
               <Pagination
                  currentPage={page}
                  pageSize={size}
                  itemsCount={count ?? 0}
                  onChange={(newPageNumber) => set({ page: newPageNumber })}
               />
            </View>
         )}
      </>
   );
}

ReviewsList.defaultProps = {
   count: 0,
   isLoading: false,
   withPagination: true,
};
