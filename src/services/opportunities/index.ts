import {
   CreateOpportunityParams,
   GetOpportunitiesResponse,
   Opportunity,
   OpportunityFilter,
} from '@/models/opportunities';

import { getResponseCount } from '@/utils';
import { api } from '../api';

export const opportunityApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getOpportunities: builder.query<
         GetOpportunitiesResponse,
         OpportunityFilter
      >({
         query: (params) => ({
            url: '/opportunities',
            method: 'GET',
            params,
         }),
         transformResponse: (
            res: { opportunities: Array<Opportunity> },
            info: { response: Record<string, any> },
         ) => ({
            list: res.opportunities,
            count: getResponseCount(info.response),
         }),
         providesTags: ['Opportunities'],
      }),
      getOpportunityById: builder.query<Opportunity, string | number>({
         query: (id) => ({
            url: `/opportunities/${id}`,
            method: 'GET',
         }),
         providesTags: ['Opportunity'],
      }),
      applyToOpportunity: builder.mutation<null, string | number>({
         query: (id) => ({
            url: `/opportunities/apply/${id}`,
            method: 'PATCH',
         }),
         invalidatesTags: ['Opportunity'],
      }),
      createOpportunity: builder.mutation<null, CreateOpportunityParams>({
         query: (opportunity) => ({
            url: '/opportunities',
            method: 'POST',
            body: opportunity,
         }),
         invalidatesTags: ['Opportunities'],
      }),
      updateOpportunity: builder.mutation<null, Opportunity>({
         query: (opportunity) => {
            // eslint-disable-next-line no-param-reassign
            delete opportunity.applicants;
            return {
               url: `/opportunities/${opportunity.id}`,
               method: 'PUT',
               body: opportunity,
            };
         },
         invalidatesTags: ['Opportunities', 'Opportunity'],
      }),
   }),
});

export const {
   useLazyGetOpportunitiesQuery,
   useGetOpportunityByIdQuery,
   useApplyToOpportunityMutation,
   useCreateOpportunityMutation,
   useUpdateOpportunityMutation,
} = opportunityApi;
