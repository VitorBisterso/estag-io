import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

import styles from './styles';

export default function EmptyResults() {
   const { t } = useTranslation();

   return <Text style={styles.text}>{t('empty.list')}</Text>;
}
