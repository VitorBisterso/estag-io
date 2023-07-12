import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/atoms/Logo';
import styles from './styles';

export default function AuthHeader() {
   const { t } = useTranslation();
   const theme = useTheme();

   return (
      <View style={styles.header}>
         <Logo />
         <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
            {t('app.name')}
         </Text>
      </View>
   );
}
