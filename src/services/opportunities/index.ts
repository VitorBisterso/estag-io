import {
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
   }),
});

export const { useLazyGetOpportunitiesQuery } = opportunityApi;
