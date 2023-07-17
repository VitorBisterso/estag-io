import {
   SignInParams,
   SignInResponse,
   SignUpCompanyParams,
   SignUpResponse,
   SignUpUserParams,
} from '@/models/auth';
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
      signUp: builder.mutation<
         SignUpResponse,
         SignUpUserParams | SignUpCompanyParams
      >({
         query: (params) => {
            const isCompany = Boolean((params as any).cnpj);
            const url = isCompany
               ? '/auth/signup/company'
               : '/auth/signup/user';
            return {
               url,
               method: 'POST',
               body: params,
            };
         },
      }),
   }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
