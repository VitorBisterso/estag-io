import {
   Company,
   CompanyFilter,
   CreateReviewParams,
   GetBusinessCategoriesResponse,
   GetCompaniesResponse,
   GetReviewsResponse,
   Review,
   ReviewFilter,
} from '@/models/reviews';
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
      createReview: builder.mutation<null, CreateReviewParams>({
         query: (review) => ({
            url: '/reviews',
            method: 'POST',
            body: review,
         }),
         invalidatesTags: ['Reviews'],
      }),
      getCompanies: builder.query<GetCompaniesResponse, CompanyFilter>({
         query: (params) => ({
            url: '/companies',
            method: 'GET',
            params,
         }),
         transformResponse: (
            res: { companies: Array<Company> },
            info: { response: Record<string, any> },
         ) => ({
            list: res.companies,
            count: getResponseCount(info.response),
         }),
         providesTags: ['Companies'],
      }),
      getCompanyById: builder.query<Company, number>({
         query: (id) => ({
            url: `/companies/${id}`,
            method: 'GET',
         }),
      }),
      getBusinessCategories: builder.query<GetBusinessCategoriesResponse, null>(
         {
            query: () => ({
               url: 'business-categories',
               method: 'GET',
            }),
         },
      ),
   }),
});

export const {
   useLazyGetReviewsQuery,
   useCreateReviewMutation,
   useLazyGetCompaniesQuery,
   useGetCompanyByIdQuery,
   useGetBusinessCategoriesQuery,
} = reviewApi;
