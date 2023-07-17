import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useSignInMutation, useSignUpMutation } from '@/services';
import { LoginContext } from '@/components/hooks/useLogin';
import AuthTemplate from '@/components/templates/Auth';
import { SignUpContext } from '@/components/hooks/useSignUp';
import { loginValidations, signUpValidations } from './validations';

export default function MainPage() {
   const { t } = useTranslation('auth');

   const [signIn, { isLoading: isSigninIn }] = useSignInMutation();
   const [signUp, { isLoading: isSigninUp }] = useSignUpMutation();

   const loginFormik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginValidations(t),
      onSubmit: () => {
         const { email, password } = loginFormik.values;

         signIn({ email, password })
            .unwrap()
            // eslint-disable-next-line no-console
            .then((result) => console.log(result))
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
      },
   });

   const signUpFormik = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
         profile: 'USER',
         birthday: '' as unknown as Date,
         cnpj: '',
         phone: '',
      },
      validationSchema: signUpValidations(t),
      onSubmit: () => {
         signUp(signUpFormik.values)
            .unwrap()
            // eslint-disable-next-line no-console
            .then((result) => console.log(result))
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
      },
   });

   const loginProviderValue = useMemo(
      () => ({
         formik: loginFormik,
         isLoading: isSigninIn,
      }),
      [loginFormik, isSigninIn],
   );
   const signUpProviderValue = useMemo(
      () => ({
         formik: signUpFormik,
         isLoading: isSigninUp,
      }),
      [signUpFormik, isSigninUp],
   );
   return (
      <LoginContext.Provider value={loginProviderValue}>
         <SignUpContext.Provider value={signUpProviderValue as any}>
            <AuthTemplate />
         </SignUpContext.Provider>
      </LoginContext.Provider>
   );
}
