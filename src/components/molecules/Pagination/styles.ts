import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/theme';

export default StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   bottom: {
      marginTop: 8,
   },
   total: {
      textTransform: 'uppercase',
   },
   text: {
      color: PRIMARY_COLOR,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
   },
   arrow: {
      margin: 0,
      padding: 0,
   },
});
