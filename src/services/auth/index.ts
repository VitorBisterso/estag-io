import { SignInParams, SignInResponse } from '@/models/auth';
import { api } from '../api';

export const authApi = api.injectEndpoints({
   endpoints: (builder) => ({
      signIn: builder.mutation<SignInResponse, SignInParams>({
         query: ({ email, password }) => ({
            url: '/auth/signin',
            method: 'POST',
            body: {
               email,
               password,
            },
         }),
      }),
   }),
});

export const { useSignInMutation } = authApi;
