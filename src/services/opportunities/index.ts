import { Opportunity, OpportunityFilter } from '@/models/opportunities';
import { api } from '../api';

export const opportunityApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getOpportunities: builder.query<Array<Opportunity>, OpportunityFilter>({
         query: (params) => ({
            url: '/opportunities',
            method: 'GET',
            params,
         }),
         transformResponse: (res: { opportunities: Array<Opportunity> }) =>
            res.opportunities,
         providesTags: ['Opportunities'],
      }),
   }),
});

export const { useGetOpportunitiesQuery } = opportunityApi;
