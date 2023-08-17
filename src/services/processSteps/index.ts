import {
   CreateProcessStepParams,
   ProcessStep,
   UpdateProcessStepParams,
} from '@/models/processSteps';
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
      updateProcessStep: builder.mutation<null, UpdateProcessStepParams>({
         query: (params) => ({
            url: `/process-steps/${params.id}`,
            method: 'PUT',
            body: params,
         }),
         invalidatesTags: ['ProcessSteps'],
      }),
      deleteProcessStep: builder.mutation<null, number>({
         query: (id) => ({
            url: `/process-steps/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['ProcessSteps'],
      }),
   }),
});

export const {
   useGetProcessStepsQuery,
   useCreateProcessStepMutation,
   useUpdateProcessStepMutation,
   useDeleteProcessStepMutation,
} = processStepApi;
