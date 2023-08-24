import {
   CreateInternshipParams,
   GetInternshipsResponse,
   Internship,
   InternshipFilter,
   UpdateInternshipsParams,
} from '@/models/internships';
import { getResponseCount } from '@/utils';
import { api } from '../api';

export const internshipApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getMyInternship: builder.query<Internship, null>({
         query: () => ({
            url: 'internships/me',
            method: 'GET',
         }),
      }),
      getInternships: builder.query<GetInternshipsResponse, InternshipFilter>({
         query: (params) => ({
            url: 'internships',
            method: 'GET',
            params,
         }),
         transformResponse: (
            res: { internships: Array<Internship> },
            info: { response: Record<string, any> },
         ) => ({
            list: res.internships,
            count: getResponseCount(info.response),
         }),
         providesTags: ['Internships'],
      }),
      getInternshipById: builder.query<Internship, number>({
         query: (id) => ({
            url: `internships/${id}`,
            method: 'GET',
         }),
      }),
      createInternship: builder.mutation<null, CreateInternshipParams>({
         query: (internship) => ({
            url: 'internships',
            method: 'POST',
            body: internship,
         }),
         invalidatesTags: ['Internships'],
      }),
      updateInternship: builder.mutation<null, UpdateInternshipsParams>({
         query: (params) => ({
            url: `internships/${params.id}`,
            method: 'PUT',
            body: params,
         }),
         invalidatesTags: ['Internships'],
      }),
   }),
});

export const {
   useGetMyInternshipQuery,
   useLazyGetInternshipsQuery,
   useGetInternshipByIdQuery,
   useCreateInternshipMutation,
   useUpdateInternshipMutation,
} = internshipApi;
