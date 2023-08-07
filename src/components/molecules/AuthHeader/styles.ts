import { StatusBar, StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   header: {
      paddingTop: Number(StatusBar.currentHeight) + 16,
      width: '100%',
      paddingBottom: 32,
      gap: 32,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: PRIMARY_COLOR,
   },
});
