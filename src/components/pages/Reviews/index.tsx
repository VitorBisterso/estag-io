import { useLazyGetReviewsQuery } from '@/services/reviews';
import { GetReviewsResponse, ReviewFilter } from '@/models/reviews';
import { FIRST_PAGE, PAGE_SIZE } from '@/consts';
import useFilter, { FilterProvider } from '@/hooks/useFilter';
import ReviewsTemplate from '@/components/templates/Reviews';

export default function ReviewsPage() {
   const [getReviews, { data, isFetching }] = useLazyGetReviewsQuery();

   const initialState: ReviewFilter = {
      size: PAGE_SIZE,
      page: FIRST_PAGE,
      description: '',
      orderBy: 'rating',
      direction: 'desc',
   };
   const filter = useFilter({
      initialState,
      onChangeState: getReviews,
   });

   return (
      <FilterProvider filter={filter}>
         <ReviewsTemplate
            data={data ?? ({} as GetReviewsResponse)}
            isFetching={isFetching}
         />
      </FilterProvider>
   );
}
