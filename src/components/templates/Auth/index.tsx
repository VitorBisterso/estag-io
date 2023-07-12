import { ScrollView, View } from 'react-native';
import { FormikContextType } from 'formik';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

import HomeHeader from '@/components/molecules/AuthHeader';
import TabGroup from '@/components/molecules/TabGroup';
import LoginForm from '@/components/organisms/LoginForm';
import styles from './styles';

interface Props {
   loginFormik: FormikContextType<{ email: string; password: string }>;
}

export default function AuthTemplate({ loginFormik }: Props) {
   const { t } = useTranslation('auth');

   const { email, password } = loginFormik.values;
   return (
      <ScrollView style={styles.container}>
         <HomeHeader />
         <View style={styles.contentWrapper}>
            <TabGroup
               tabs={[
                  {
                     title: t('tabs.login'),
                     component: (
                        <LoginForm
                           email={email}
                           password={password}
                           setField={(field, value) =>
                              loginFormik.setFieldValue(field, value)
                           }
                           onBlur={(field) => loginFormik.handleBlur(field)}
                           errors={loginFormik.errors}
                           onSubmit={loginFormik.handleSubmit}
                        />
                     ),
                  },
                  {
                     title: t('tabs.register'),
                     component: <Text>register</Text>,
                  },
                  {
                     title: t('tabs.recover.password'),
                     component: <Text>forgot password</Text>,
                  },
               ]}
            />
         </View>
      </ScrollView>
   );
}
