import { ScrollView } from 'react-native';
import { FormikContextType } from 'formik';

import HomeHeader from '@/components/molecules/AuthHeader';
import LoginForm from '@/components/organisms/LoginForm';
import styles from './styles';

interface Props {
   loginFormik: FormikContextType<{ email: string; password: string }>;
}

export default function AuthTemplate({ loginFormik }: Props) {
   const { email, password } = loginFormik.values;
   return (
      <ScrollView style={styles.container}>
         <HomeHeader />
         <LoginForm
            email={email}
            password={password}
            setField={(field, value) => loginFormik.setFieldValue(field, value)}
            onBlurEmail={() => loginFormik.handleBlur('email')}
            onBlurPassword={() => loginFormik.handleBlur('password')}
            errors={loginFormik.errors}
            onSubmit={loginFormik.handleSubmit}
         />
      </ScrollView>
   );
}
