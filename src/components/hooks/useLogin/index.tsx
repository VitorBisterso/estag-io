import React, { useContext } from 'react';
import { FormikContextType } from 'formik';

export type LoginContextType = {
   formik: FormikContextType<{ email: string; password: string }>;
   isLoading: boolean;
};

export const LoginContext = React.createContext<LoginContextType | null>(null);
export default function useLogin() {
   return useContext(LoginContext) as LoginContextType;
}
