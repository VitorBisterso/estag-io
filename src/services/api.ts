import {
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
   createApi,
   fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Toast from 'react-native-toast-message';

import * as RootNavigation from '@/navigation';
import { getData, storeData } from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY, AUTH_PAGE, REFRESH_TOKEN_KEY } from '@/consts';
import env from '@/env.json';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
   baseUrl: env.BASE_URL,
   prepareHeaders: async (headers) => {
      const hasRefreshToken = headers.get('authorization');
      if (hasRefreshToken) return headers;

      const token = await getData(ACCESS_TOKEN_KEY);
      if (token) headers.set('authorization', `Bearer ${token}`);

      return headers;
   },
});

const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   // wait until the mutex is available without locking it
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);
   if (result.error && result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
         const release = await mutex.acquire();
         try {
            const refreshToken = await getData(REFRESH_TOKEN_KEY);
            const refreshResult = await baseQuery(
               {
                  url: '/auth/refresh',
                  method: 'POST',
                  headers: {
                     authorization: `Bearer ${refreshToken}`,
                  },
               },
               api,
               extraOptions,
            );
            if (refreshResult.data) {
               await storeData(
                  ACCESS_TOKEN_KEY,
                  (refreshResult.data as Record<string, string>).accessToken,
               );
               // retry the initial query
               result = await baseQuery(args, api, extraOptions);
            } else {
               await storeData(ACCESS_TOKEN_KEY, '');
               await storeData(REFRESH_TOKEN_KEY, '');
               Toast.show({
                  type: 'error',
                  text1: 'Erro!',
                  text2: 'Sua sessão expirou. Faça login novamente',
                  visibilityTime: 5000,
               });
               RootNavigation.navigate(AUTH_PAGE);
            }
         } finally {
            // release must be called once the mutex should be released again.
            release();
         }
      } else {
         // wait until the mutex is available without locking it
         await mutex.waitForUnlock();
         result = await baseQuery(args, api, extraOptions);
      }
   }
   return result;
};

// eslint-disable-next-line import/prefer-default-export
export const api = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryWithReauth,
   tagTypes: ['Opportunities', 'Opportunity', 'ProcessSteps'],
   endpoints: () => ({}),
});
