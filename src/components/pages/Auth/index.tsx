import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation, StackActions } from '@react-navigation/native';

import { useSignInMutation, useSignUpMutation } from '@/services';
import { LoginContext } from '@/hooks/useLogin';
import useToast from '@/hooks/useToast';
import { storeData } from '@/hooks/useLocalStorage';
import AuthTemplate from '@/components/templates/Auth';
import { SignUpContext } from '@/hooks/useSignUp';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, LOGGED_ROUTES } from '@/consts';
import { loginValidations, signUpValidations } from './validations';

export default function AuthPage() {
   const { t } = useTranslation(['auth', 'common']);
   const toast = useToast();
   const navigation = useNavigation();

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
            .then(({ accessToken, refreshToken }) => {
               storeData(ACCESS_TOKEN_KEY, accessToken);
               storeData(REFRESH_TOKEN_KEY, refreshToken);

               toast.success(t('success.signed.in'));
               navigation.dispatch(StackActions.replace(LOGGED_ROUTES));
            });
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
            .then(() => {
               const createdObject =
                  signUpFormik.values.profile === 'USER'
                     ? t('labels.option.user')
                     : t('labels.option.company');
               toast.success(
                  t('success.created', { ns: 'common', object: createdObject }),
               );
            });
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
