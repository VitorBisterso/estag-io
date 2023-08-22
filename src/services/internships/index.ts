import { MyInternship } from '@/models/internships';
import { api } from '../api';

export const internshipApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getMyInternship: builder.query<MyInternship, null>({
         query: () => ({
            url: 'internships/me',
            method: 'GET',
         }),
      }),
   }),
});

export const { useGetMyInternshipQuery } = internshipApi;
