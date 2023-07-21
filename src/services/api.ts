import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY } from '@/consts';
import env from '@/env.json';

const baseQuery = fetchBaseQuery({
   baseUrl: env.BASE_URL,
   prepareHeaders: async (headers) => {
      const token = await getData(ACCESS_TOKEN_KEY);

      if (token) {
         headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
   },
});

// eslint-disable-next-line import/prefer-default-export
export const api = createApi({
   reducerPath: 'api',
   baseQuery,
   tagTypes: ['Opportunities'],
   endpoints: () => ({}),
});
