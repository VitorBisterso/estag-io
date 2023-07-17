import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

import HomeHeader from '@/components/molecules/AuthHeader';
import TabGroup from '@/components/molecules/TabGroup';
import LoginForm from '@/components/organisms/LoginForm';
import SignUpForm from '@/components/organisms/SignUpForm';
import styles from './styles';

export default function AuthTemplate() {
   const { t } = useTranslation('auth');

   return (
      <ScrollView style={styles.container}>
         <HomeHeader />
         <View style={styles.contentWrapper}>
            <TabGroup
               tabs={[
                  {
                     title: t('tabs.login'),
                     component: <LoginForm />,
                  },
                  {
                     title: t('tabs.register'),
                     component: <SignUpForm />,
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
