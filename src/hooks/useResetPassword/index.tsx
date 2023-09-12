import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

export type ResetPasswordFormValues = {
   email: string;
};

export type ResetPasswordContextType = {
   formik: FormikContextType<ResetPasswordFormValues>;
   isLoading: boolean;
};

export const ResetPasswordContext =
   createContext<ResetPasswordContextType | null>(null);
export default function useResetPassword() {
   return useContext(ResetPasswordContext) as ResetPasswordContextType;
}
