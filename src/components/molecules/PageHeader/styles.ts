import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 32,
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: PRIMARY_COLOR,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 32,
      marginLeft: 16,
   },
   icon: {
      marginLeft: 'auto',
   },
});
