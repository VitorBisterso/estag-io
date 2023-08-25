import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

import {
   BusinessCategory,
   GetBusinessCategoriesResponse,
} from '@/models/reviews';

export type SignUpValues = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
   profile: string;
   birthday: string;
   cnpj: string;
   phone: string;
   businessCategory: BusinessCategory;
};

export type SignUpContextType = {
   formik: FormikContextType<SignUpValues>;
   isLoading: boolean;
   categories: GetBusinessCategoriesResponse;
};

export const SignUpContext = createContext<SignUpContextType | null>(null);
export default function useSignUp() {
   return useContext(SignUpContext) as SignUpContextType;
}
