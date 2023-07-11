import { StatusBar } from 'expo-status-bar';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import AuthTemplate from '@/components/templates/Auth';
import loginValidations from './loginValidations';

export default function MainPage() {
   const { t } = useTranslation('auth');

   const loginFormik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginValidations(t),
      onSubmit: () => {
         console.log(loginFormik.values);
      },
   });

   return (
      <>
         <StatusBar style="auto" />
         <AuthTemplate loginFormik={loginFormik} />
      </>
   );
}
