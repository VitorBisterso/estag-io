import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

export type SignUpValues = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
   profile: string;
   birthday: string;
   cnpj: string;
   phone: string;
};

export type SignUpContextType = {
   formik: FormikContextType<SignUpValues>;
   isLoading: boolean;
};

export const SignUpContext = createContext<SignUpContextType | null>(null);
export default function useSignUp() {
   return useContext(SignUpContext) as SignUpContextType;
}
