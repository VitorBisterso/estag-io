import { ProcessStep } from '@/models/processSteps';
import { api } from '../api';

export const processStepApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getProcessSteps: builder.query<Array<ProcessStep>, number>({
         query: (opportunityId) => ({
            url: `/process-steps/opportunity/${opportunityId}`,
            method: 'GET',
         }),
         providesTags: ['ProcessSteps'],
      }),
   }),
});

export const { useGetProcessStepsQuery } = processStepApi;
