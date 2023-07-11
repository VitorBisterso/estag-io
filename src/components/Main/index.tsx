import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/Logo';

export default function App() {
   const { t } = useTranslation(['auth', 'common']);

   return (
      <>
         <View style={styles.container}>
            <Logo />
            <Text variant="headlineMedium">
               {t('app.name', { ns: 'common' })}
            </Text>
            <Text variant="headlineMedium">{t('tabs.login')}</Text>

            <StatusBar style="auto" />
         </View>
         <View style={styles.container}>
            <Text>a</Text>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
