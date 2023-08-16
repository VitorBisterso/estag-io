import { CreateProcessStepParams, ProcessStep } from '@/models/processSteps';
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
      createProcessStep: builder.mutation<null, CreateProcessStepParams>({
         query: (params) => ({
            url: `/process-steps/opportunity/${params.opportunityId}`,
            method: 'POST',
            body: params.processStep,
         }),
         invalidatesTags: ['ProcessSteps'],
      }),
   }),
});

export const { useGetProcessStepsQuery, useCreateProcessStepMutation } =
   processStepApi;
