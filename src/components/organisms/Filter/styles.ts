import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   justify: {
      justifyContent: 'space-between',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   filterText: {
      fontSize: 24,
   },
   filterIcon: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
   },
   button: {
      marginTop: 8,
   },
});
