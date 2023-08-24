import { GetReviewsResponse, Review, ReviewFilter } from '@/models/reviews';
import { getResponseCount } from '@/utils';
import { api } from '../api';

export const reviewApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getReviews: builder.query<GetReviewsResponse, ReviewFilter>({
         query: (params) => ({
            url: '/reviews',
            method: 'GET',
            params,
         }),
         transformResponse: (
            res: { reviews: Array<Review> },
            info: { response: Record<string, any> },
         ) => ({
            list: res.reviews,
            count: getResponseCount(info.response),
         }),
         providesTags: ['Reviews'],
      }),
   }),
});

export const { useLazyGetReviewsQuery } = reviewApi;
