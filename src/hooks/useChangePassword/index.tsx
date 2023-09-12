import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

export type ChangePasswordFormValues = {
   email: string;
   token: string;
   password: string;
   confirmPassword: string;
};

export type ChangePasswordContextType = {
   formik: FormikContextType<ChangePasswordFormValues>;
   isLoading: boolean;
};

export const ChangePasswordContext =
   createContext<ChangePasswordContextType | null>(null);
export default function useChangePassword() {
   return useContext(ChangePasswordContext) as ChangePasswordContextType;
}
