import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/env.json';

// eslint-disable-next-line import/prefer-default-export
export const api = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: env.BASE_URL }),
   tagTypes: [],
   endpoints: () => ({}),
});
