import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useSignInMutation } from '@/services';
import { LoginContext } from '@/components/hooks/useLogin';
import AuthTemplate from '@/components/templates/Auth';
import loginValidations from './loginValidations';

export default function MainPage() {
   const { t } = useTranslation('auth');

   const [signIn, { isLoading: isSigninIn }] = useSignInMutation();

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

   const loginProviderValue = useMemo(
      () => ({
         formik: loginFormik,
         isLoading: isSigninIn,
      }),
      [loginFormik, isSigninIn],
   );
   return (
      <LoginContext.Provider value={loginProviderValue}>
         <AuthTemplate />
      </LoginContext.Provider>
   );
}
